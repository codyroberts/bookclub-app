import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";

export default component$(() => {
  const session = useAuthSession();
  return (
    <header class="content-center bg-darkest text-white">
      <ul class="flex list-none flex-row items-center justify-evenly">
        {session.value ? (
          <>
            <li>
              <Link class="text-xl" href="/myprofile">
                My Profile
              </Link>
            </li>
            <li>
              <Link class="text-xl" href="/mybookshelf">
                My Bookshelf
              </Link>
            </li>
            <li>
              <Link class="text-xl" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link class="text-xl" href="/myclubs">
                My Clubs
              </Link>
            </li>
            <li>
              <Link class="text-xl" href="/search">
                Search
              </Link>
            </li>
            <li>
              <Link class="text-xl" href="/api/auth/signout">
                Sign out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link class="ml-auto text-xl" href="/api/auth/signin">
                Sign in
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
});
