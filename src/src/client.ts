import { server$ } from "@builder.io/qwik-city";
import * as edgedb from "edgedb";

let client: edgedb.Client | null = null;

export const getClient = server$(function () {
  client ??= edgedb.createClient();
  return client;
});
