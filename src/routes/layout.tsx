import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export const onGet: RequestHandler = async () => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  // cacheControl({
  //   // Always serve a cached response by default, up to a week stale
  //   staleWhileRevalidate: 60 * 60 * 24 * 7,
  //   // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
  //   maxAge: 5,
  // });
};

export default component$(() => {
  return (
    <div class="grid h-screen grid-rows-[70px_auto_70px]">
      <Header />
      <main class="justify-stretch">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
