import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { getClient } from "~/client";
import { Button } from "~/components/Button";
import { BookCard } from "~/components/BookCard";
import { getBookshelf } from "dbschema/queries/getBookshelf.query";
import { removeBookFromShelf } from "dbschema/queries/removeBookFromShelf.query";
import type { Session } from "@auth/core/types";

export const useShelf = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
  const client = await getClient();
  const shelf = await getBookshelf(client, { email });
  return shelf;
});

const IdSchema = z.object({
  googleId: z.string(),
});

export const useUnShelveBook = routeAction$(async (data, event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
  const client = await getClient();
  await removeBookFromShelf(client, {
    googleId: data.googleId,
    email,
  });
}, zod$(IdSchema));

export default component$(() => {
  const shelf = useShelf();
  const unShelveBookAction = useUnShelveBook();
  return (
    <div class="flex h-full flex-col items-center bg-lightest p-12 text-black">
      <h1 class="m-2 text-darkest">Books on your Bookshelf</h1>
      <div class="flex flex-wrap justify-center gap-4">
        {shelf.value?.bookShelf.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            description={book.description}
            imgUrl={book.imgUrl}
          >
            <Button
              onClick$={() =>
                unShelveBookAction.submit({
                  googleId: book.googleId,
                })
              }
              class="absolute bottom-2 right-2 bg-darkest hover:border-2 hover:border-darkest hover:bg-light hover:text-darkest"
            >
              Unshelve
            </Button>
          </BookCard>
        )) ?? <p class="m-5">No books found</p>}
      </div>
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
