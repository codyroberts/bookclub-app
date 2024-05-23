import { Slot, component$ } from "@builder.io/qwik";

type Props = {
  title: string;
  description: string;
  imgUrl: string;
};

export const BookCard = component$<Props>(({ title, description, imgUrl }) => {
  return (
    <div class="relative h-[500px] w-[350px] overflow-hidden bg-dark p-4 text-light">
      <p class="truncate text-xl">{title}</p>
      <img alt={title} class="m-auto" width="200" height="300" src={imgUrl} />
      <p class="h-[75px] overflow-hidden text-ellipsis">{description}</p>
      <Slot />
    </div>
  );
});
