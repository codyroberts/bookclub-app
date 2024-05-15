import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { EdgeDBAdapter } from "@auth/edgedb-adapter";
import { createClient } from "edgedb";
import type { Adapter } from "@auth/core/adapters";

const client = createClient();

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    // Don't know why I need to cast this.
    adapter: EdgeDBAdapter(client) as Adapter,
    trustHost: true,
    providers: [
      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
      Google({
        clientId: env.get("GOOGLE_ID")!,
        clientSecret: env.get("GOOGLE_SECRET")!,
      }),
    ] as Provider[],
  }));
