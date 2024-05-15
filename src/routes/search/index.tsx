import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, type DocumentHead } from "@builder.io/qwik-city";

interface SearchQuery {
  items?: Array<{
    id: string;
    volumeInfo: {
      title?: string;
      authors?: Array<string>;
      publisher?: string;
      publishedDate?: string;
      description?: string;
      industryIdentifiers?: Array<Identifier>;
    };
  }>;
}

interface Identifier {
  type: string;
  identifier: string;
}

interface Book {
  title?: string;
  authors?: Array<string>;
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: Array<Identifier>;
}

interface BookEntryProps {
  book: Book;
}

const BookEntry = component$<BookEntryProps>(({ book }) => {
  return (
    <div class="m-2 grid grid-cols-[20%_80%] gap-3 border-2 border-darkest p-5">
      <p class="">Title:</p>
      <div class="">{book.title}</div>
      <p class="">Author:</p>
      <div class="">{book.authors?.[0]}</div>
      <p class="">Publisher:</p>
      <div class="">{book.publisher}</div>
      <p class="">Date Published:</p>
      <div class="">{book.publishedDate}</div>
      <p class="">ISBN 10</p>
      <div class="">{book.industryIdentifiers?.[0].identifier}</div>
      <p class="">Description:</p>
      <div class="">{book.description}</div>
      <button class="rounded-xl bg-darkest p-2 text-light hover:bg-dark">
        Add to Shelf
      </button>
    </div>
  );
});

export const useFetchBooks = routeAction$(async (data, event) => {
  const key = event.env.get("GOOGLE_BOOKS_API_KEY")!;
  const params = new URLSearchParams({
    q: `intitle:${data.title}+inauthor:${data.author}`,
    key,
  });
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?${params}`,
  );

  const result: SearchQuery = await res.json();

  return {
    success: true,
    result,
  };
});

export default component$(() => {
  const action = useFetchBooks();

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
        <ul>
          {action.value.result.items?.map((book) => (
            <li key={book.id}>
              <BookEntry book={book.volumeInfo} />
            </li>
          )) ?? <p class="m-5">No books found</p>}
        </ul>
      ) : null}
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