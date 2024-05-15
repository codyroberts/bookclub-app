import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { getClient } from "~/client";
import type { Club } from "dbschema/interfaces";
import { useAuthSession } from "../plugin@auth";

export const useClubs = routeLoader$(async () => {
  const client = await getClient();
  const clubs = await client.query<Club>(`
    select Club {
      id,
      name
    }
  `);
  return clubs;
});

export const useAddClub = routeAction$(async (data) => {
  const client = await getClient();
  await client.execute(
    `
    insert Club {
      name := <str>$name
    }
  `,
    data,
  );
});

export default component$(() => {
  const session = useAuthSession();
  console.log(session.value);
  const clubs = useClubs();
  const createClubAction = useAddClub();
  return (
    <div class=" m-12 flex h-full flex-col items-center bg-lightest text-black">
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
          <Form action={createClubAction}>
            <input name="name" />
            <button type="submit">Create</button>
          </Form>
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
