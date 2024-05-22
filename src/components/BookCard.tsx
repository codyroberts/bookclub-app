import { Slot, component$ } from "@builder.io/qwik";
import type { Volume } from "~/schemas";

export const BookCard = component$<{ book: Volume }>(({ book }) => {
  const bookCover = () => {
    if (book.imageLinks?.thumbnail) {
      return book.imageLinks.thumbnail;
    } else {
      return book.imgUrl;
    }
  };
  return (
    <div class="relative h-[500px] w-[350px] overflow-hidden bg-dark p-4 text-light">
      <p class="truncate text-xl">{book.title}</p>
      <img
        alt={book.title}
        class="m-auto p-2"
        width="200"
        height="300"
        src={bookCover()}
      />
      <p class="h-[75px] overflow-hidden text-ellipsis">{book.description}</p>
      <Slot />
    </div>
  );
});
