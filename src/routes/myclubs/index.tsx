import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { getClient } from "~/client";
import type { Session } from "@auth/core/types";
import { getUserClubs } from "dbschema/queries/getUserClubs.query";
import { createClub } from "dbschema/queries/createClub.query";

export const useClubs = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return [];
  const client = await getClient();
  const clubs = await getUserClubs(client, { email });
  return clubs;
});

export const useAddClub = routeAction$(
  async (data, event) => {
    const client = await getClient();
    const session: Session | null = event.sharedMap.get("session");
    const email = session?.user?.email;
    const { name } = data;
    if (!email) return;
    await createClub(client, { name, email });
  },
  zod$({
    name: z.string(),
  }),
);

export default component$(() => {
  const clubs = useClubs();
  const createClubAction = useAddClub();
  return (
    <div class=" m-12 flex h-full flex-col items-center bg-lightest text-black">
      <Form action={createClubAction}>
        <input name="name" />
        <button type="submit">Create</button>
      </Form>
      {clubs.value.length ? (
        <>
          <h2>Here are your clubs</h2>
          <ul>
            {clubs.value.map((club) => (
              <li key={club.id}>{club.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>You have no clubs. Lets create one!</p>
        </>
      )}
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
