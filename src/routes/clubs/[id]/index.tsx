import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { getClubById } from "dbschema/queries/getClubById.query";
import { getClient } from "~/client";
import { createReadingSession } from "dbschema/queries/createReadingSession.query";
import { Button } from "~/components/Button";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  ModalWrapper,
} from "~/components/modal";
import { Label } from "@qwik-ui/headless";
import { Input } from "~/components/input";

export const useClub = routeLoader$(async (event) => {
  const client = await getClient();
  const id = event.params.id;
  const club = await getClubById(client, { id });
  if (!club) throw new Error("club does not exist");
  return club;
});

export const useCreateSession = routeAction$(
  async (data, event) => {
    const client = await getClient();
    const id = event.params.id;
    await createReadingSession(client, { id, name: data.name });
  },
  zod$({
    name: z.string(),
  }),
);

export default component$(() => {
  const club = useClub();
  const nameSig = useSignal("");
  const createSessionAction = useCreateSession();
  const currentSession = useComputed$(() => club.value.currentSession);
  return (
    <div class="p-4">
      <h2 class="text-3xl">{club.value.name}</h2>
      {/* <h3>Members</h3>
      <ul>
        {club.value?.members.map(({ name, id }) => <li key={id}>{name}</li>)}
      </ul> */}
      {!currentSession.value && (
        <>
          <p>You have no active reading session. Create one now!</p>
          <ModalWrapper>
            <ModalTrigger>
              <Button>Create Session</Button>
            </ModalTrigger>
            <Modal>
              <ModalHeader>
                <h2 class="text-lg font-bold">Create Reading Session</h2>
              </ModalHeader>
              <ModalContent>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      class="col-span-3"
                      bind:value={nameSig}
                    />
                  </div>
                </div>
              </ModalContent>
              <ModalFooter>
                <Button
                  onClick$={() => {
                    createSessionAction.submit({ name: nameSig.value });
                    nameSig.value = "";
                  }}
                >
                  Save changes
                </Button>
              </ModalFooter>
            </Modal>
          </ModalWrapper>{" "}
        </>
      )}
      {/* <Form action={createSessionAction}>
        <input name="name" placeholder="Session Name" />
        <button type="submit">Create</button>
      </Form> */}
      <ul>
        {club.value.readingSessions.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
});
