import { Slot, component$ } from "@builder.io/qwik";
import type { Volume } from "~/schemas";

export const BookCard = component$<{ book: Volume }>(({ book }) => {
  return (
    <div class="relative h-[500px] w-[350px] overflow-hidden bg-dark p-4 text-light">
      <p class="truncate text-xl">{book.title}</p>
      <img
        alt={book.title}
        class="m-auto"
        width="200"
        height="300"
        src={book.imageLinks?.thumbnail}
      />
      <p class="h-[75px] overflow-hidden text-ellipsis">{book.description}</p>
      <Slot />
    </div>
  );
});
