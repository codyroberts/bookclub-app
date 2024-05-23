import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  z,
  zod$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { getClient } from "~/client";
import { BookCard } from "~/components/BookCard";
import { Button } from "~/components/Button";
import { SearchQuerySchema, type Volume } from "~/schemas";
import { addBookToShelf } from "dbschema/queries/addBookToShelf.query";
import type { Session } from "@auth/core/types";

const BookSchema = z.object({
  googleId: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  imgUrl: z.string().optional(),
});

export const useShelveBook = routeAction$(async (data, event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
  const client = await getClient();
  await addBookToShelf(client, {
    googleId: data.googleId,
    title: data.title,
    description: data.description,
    url: data.url,
    imgUrl: data.imgUrl,
    email,
  });
}, zod$(BookSchema));

export const useFetchBooks = routeAction$(async (data, event) => {
  const key = event.env.get("GOOGLE_BOOKS_API_KEY")!;
  const params = new URLSearchParams({
    q: `intitle:${data.title}+inauthor:${data.author}`,
    key,
  });
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?${params}`,
  );

  const result = SearchQuerySchema.parse(await res.json());
  const success = !("error" in result);
  if (!success) console.log(result.error);
  console.log(result);
  return {
    success,
    result,
  };
});

export default component$(() => {
  const action = useFetchBooks();
  const shelveBookAction = useShelveBook();

  return (
    <div class=" flex h-full flex-col items-center bg-lightest p-12 text-black">
      <h1 class="m-2 text-darkest">Search for a book</h1>
      <Form action={action} class="flex flex-col gap-2">
        <input
          name="title"
          placeholder="Title"
          class="border-2 border-darkest bg-light"
        ></input>
        <input
          name="author"
          placeholder="Author"
          class="border-2 border-darkest bg-light"
        ></input>
        {/* <input
          name="isbn"
          placeholder="ISBN"
          class="border-2 border-darkest bg-light"
        ></input> */}
        <button
          type="submit"
          class="rounded-xl bg-darkest p-2 text-light hover:bg-dark"
        >
          Submit
        </button>
      </Form>
      {action.value?.success ? (
        <div class="flex flex-wrap justify-center gap-4 pt-2">
          {action.value.result.items?.map((book) => (
            <BookCard key={book.id} book={book.volumeInfo}>
              <Button
                onClick$={() =>
                  shelveBookAction.submit({
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description,
                    googleId: book.id,
                    imgUrl: book.volumeInfo.imageLinks?.thumbnail,
                  })
                }
                class="absolute bottom-2 right-2 bg-darkest hover:border-2 hover:border-darkest hover:bg-light hover:text-darkest"
              >
                Add to shelf
              </Button>
            </BookCard>
          )) ?? <p class="m-5">No books found</p>}
        </div>
      ) : null}
      {action.value?.success === false && <p>Error fetching books</p>}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Book Club App",
  meta: [
    {
      name: "Book Club App",
      content: "Your companion in the world of books!",
    },
  ],
};
