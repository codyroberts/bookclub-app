import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { getClubById } from "dbschema/queries/getClubById.query";
import { getClient } from "~/client";
import { createReadingSession } from "dbschema/queries/createReadingSession.query";

export const useClub = routeLoader$(async (event) => {
  const client = await getClient();
  const id = event.params.id;
  const club = await getClubById(client, { id });
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
  const createSessionAction = useCreateSession();
  return (
    <div>
      <h2>{club.value?.name}</h2>
      <h3>Members</h3>
      <ul>
        {club.value?.members.map(({ name, id }) => <li key={id}>{name}</li>)}
      </ul>
      <h3>Reading Sessions</h3>
      <Form action={createSessionAction}>
        <input name="name" placeholder="Session Name" />
        <button type="submit">Create</button>
      </Form>
      <ul>
        {club.value?.readingSessions.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
});
