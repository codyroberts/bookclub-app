import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getClient } from "~/client";
import { BookCard } from "~/components/BookCard";
import { getBookShelf } from "dbschema/queries/getBookShelf.query";
import type { Session } from "@auth/core/types";

export const useShelf = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
  const client = await getClient();
  const shelf = await getBookShelf(client, { email });

  return shelf;
});

export default component$(() => {
  const shelf = useShelf();
  return (
    <div class=" flex h-full flex-col items-center bg-lightest p-12 text-black">
      <h1 class="m-2 text-darkest">Books on your Bookshelf</h1>
      <div class="flex flex-wrap justify-center gap-4">
        {shelf.value?.bookShelf.map((book) => (
          <BookCard key={book.id} book={book} />
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
