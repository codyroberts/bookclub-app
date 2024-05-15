import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { getClient } from "~/client";
import type { Club } from "dbschema/interfaces";
import type { Session } from "@auth/core/types";

export const useClubs = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  if (!session) return [];
  const client = await getClient();
  const clubs = await client.query<Club>(`
    select Club {
      id,
      name,
      members: {
        name
      }
    } filter .members.email = "jqrainwater@gmail.com"
  `);
  return clubs;
});

export const useAddClub = routeAction$(async (data, event) => {
  const client = await getClient();
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return;
  await client.execute(
    `
    insert Club {
      name := <str>$name,
      members := (select User filter .email = <str>$email)
    }
  `,
    { name: data.name, email },
  );
});

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
