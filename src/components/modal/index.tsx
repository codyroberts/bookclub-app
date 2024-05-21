import type { PropsOf, Signal } from "@builder.io/qwik";
import {
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import {
  Modal as QwikUIModal,
  ModalHeader as QwikUIModalHeader,
  ModalContent as QwikUIModalContent,
  ModalFooter as QwikUIModalFooter,
} from "@qwik-ui/headless";
import { cn } from "@qwik-ui/utils";
import { LuX } from "@qwikest/icons/lucide";

export const ModalContext = createContextId<Signal<boolean>>("modal-context");

export const ModalWrapper = component$<PropsOf<"div">>(({ ...props }) => {
  const showSig = useSignal(false);
  useContextProvider(ModalContext, showSig);
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});

export const Modal = component$(() => {
  const showSig = useContext(ModalContext);

  return (
    <QwikUIModal
      class="bg-background text-foreground rounded-base data-[state=open]:appear data-[state=closed]:disappear backdrop:data-[state=open]:appear backdrop:data-[state=closed]:disappear max-w-sm p-6 shadow-md transition-all duration-300 backdrop:backdrop-blur-sm backdrop:transition-all backdrop:duration-300"
      bind:show={showSig}
    >
      <Slot />
    </QwikUIModal>
  );
});

export const ModalTrigger = component$<PropsOf<"button">>(({ ...props }) => {
  const showSig = useContext(ModalContext);
  return (
    <div onClick$={() => (showSig.value = true)}>
      <Slot {...props} />
    </div>
  );
});

export const ModalHeader = component$<PropsOf<typeof QwikUIModalHeader>>(
  ({ ...props }) => {
    const showSig = useContext(ModalContext);
    return (
      <QwikUIModalHeader
        {...props}
        class={cn(
          "flex flex-col space-y-1.5 text-center sm:text-left",
          props.class,
        )}
      >
        <Slot />
        <button
          onClick$={() => {
            console.log("closing");
            showSig.value = false;
          }}
          class="absolute right-4 top-4"
        >
          <LuX class="h-5 w-5" />
        </button>
      </QwikUIModalHeader>
    );
  },
);

export const ModalContent = component$<PropsOf<typeof QwikUIModalContent>>(
  ({ ...props }) => {
    return (
      <QwikUIModalContent {...props} class={cn("mb-2 py-4", props.class)}>
        <Slot />
      </QwikUIModalContent>
    );
  },
);

export const ModalFooter = component$<PropsOf<typeof QwikUIModalFooter>>(
  ({ ...props }) => {
    return (
      <QwikUIModalFooter
        {...props}
        class={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          props.class,
        )}
      >
        <Slot />
      </QwikUIModalFooter>
    );
  },
);
