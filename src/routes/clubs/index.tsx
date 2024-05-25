import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
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
import { joinClub } from "dbschema/queries/joinClub.query";

export const useMyClubs = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
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

export const useJoinClub = routeAction$(
  async (data, event) => {
    const client = await getClient();
    const session: Session | null = event.sharedMap.get("session");
    const email = session?.user?.email;
    const { clubId } = data;
    if (!email) return;
    await joinClub(client, { clubId, email });
  },
  zod$({
    clubId: z.string(),
  }),
);

export default component$(() => {
  const myClubs = useMyClubs();
  const createClubAction = useAddClub();
  const joinClubAction = useJoinClub();
  return (
    <div class="flex h-full flex-col items-center bg-lightest p-12 text-black">
      <h2 class="text-2xl text-darkest">Create a Club</h2>
      <Form class="flex flex-col gap-2" action={createClubAction}>
        <input
          placeholder="Club Name"
          class="border-2 border-darkest bg-light"
          name="name"
        />
        <button
          class="rounded-xl bg-darkest p-2 text-light hover:bg-dark"
          type="submit"
        >
          Create
        </button>
      </Form>
      <h2 class="text-2xl text-darkest">My Clubs</h2>
      {myClubs.value?.myClubs.length ? (
        <>
          <div class="grid w-full grid-cols-5 gap-4">
            {myClubs.value.myClubs.map((club) => (
              <div key={club.id} class="bg-dark p-2">
                <h3 class="text-xl">
                  <Link href={`/clubs/${club.id}`}>{club.name}</Link>
                </h3>
                <p>Members</p>
                <ul>
                  {club.members.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p class="text-darkest">You have no clubs. Lets create one!</p>
        </>
      )}
      <h2 class="text-2xl text-darkest">Join a Club</h2>
      <>
        <div class="grid w-full grid-cols-5 gap-4">
          {myClubs.value?.recommendedClubs.map((club) => (
            <div key={club.id} class="bg-dark p-2">
              <h3 class="text-xl">{club.name}</h3>
              <p>Members</p>
              <ul>
                {club.members.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
              <button
                onClick$={() => joinClubAction.submit({ clubId: club.id })}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </>
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
