import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class="content-center bg-darkest text-white">
      <ul class="flex list-none flex-row items-center justify-evenly">
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
      </ul>
    </header>
  );
});
