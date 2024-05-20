import type { PropsOf } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

export const Button = component$<PropsOf<"button">>((props) => {
  return (
    <button
      {...props}
      class={[
        "rounded-xl bg-darkest p-2 text-light hover:bg-dark",
        props.class,
      ]}
    >
      <Slot />
    </button>
  );
});
