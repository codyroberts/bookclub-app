import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getUser } from "dbschema/queries/getUser.query";
import { getUserClubs } from "dbschema/queries/getUserClubs.query";
import type { Session } from "@auth/core/types";
import { getClient } from "~/client";

export const useMyProfile = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
  const client = await getClient();
  const user = await getUser(client, { email });

  return user;
});

export const useMyClubs = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  if (!email) return null;
  const client = await getClient();
  const clubs = await getUserClubs(client, { email });

  return clubs;
});

export default component$(() => {
  const User = useMyProfile();
  const myClubs = useMyClubs();
  return (
    <div class="flex h-full flex-col items-center bg-light p-12 text-darkest">
      <h3 class="text-4xl"> {User.value?.name} </h3>

      <h3 class="mt-8 text-2xl"> My Clubs: </h3>
      <ul class="w-46 m-2 bg-darkest text-xl">
        {myClubs.value?.myClubs.map((club) => (
          <li key={club.id} class="p-1 text-light">
            <h3>{club.name}</h3>
          </li>
        ))}
      </ul>
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
