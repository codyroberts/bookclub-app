import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { getClubById } from "dbschema/queries/getClubById.query";
import { getClient } from "~/client";
import { createReadingSession } from "dbschema/queries/createReadingSession.query";
import { getBookshelf } from "dbschema/queries/getBookshelf.query";
import { Button } from "~/components/Button";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  ModalWrapper,
} from "~/components/modal";
import { Label } from "@qwik-ui/headless";
import { Input } from "~/components/input";
import type { Session } from "@auth/core/types";
import { BookCard } from "~/components/BookCard";
import e from "dbschema/edgeql-js";
import { useAuthSession } from "~/routes/plugin@auth";

export const useClub = routeLoader$(async (event) => {
  const client = await getClient();
  const id = event.params.id;
  const club = await getClubById(client, { id });
  if (!club) throw new Error("club does not exist");
  return club;
});

export const useCreateSession = routeAction$(
  async (data, event) => {
    const client = await getClient();
    const id = event.params.id;
    await createReadingSession(client, { id, name: data.name });
  },
  zod$({
    name: z.string(),
  }),
);

export const useAddBookRecommendation = routeAction$(
  async (data) => {
    const client = await getClient();
    const id = data.id;
    const bookVote = e.insert(e.BookVote, {
      book: e.select(e.Book, () => ({
        filter_single: { id: data.bookId },
      })),
    });
    await e
      .update(e.ReadingSession, () => ({
        filter_single: { id },
        set: {
          bookRecommendations: {
            "+=": bookVote,
          },
        },
      }))
      .run(client);
  },
  zod$({ id: z.string(), bookId: z.string() }),
);

export const useVote = routeAction$(
  async (data, event) => {
    const session: Session | null = event.sharedMap.get("session");
    const email = session?.user?.email;
    if (!email) return;
    const client = await getClient();
    await e
      .update(e.BookVote, () => ({
        filter_single: { id: data.id },
        set: {
          voters: {
            "+=": e.select(e.User, () => ({
              id: true,
              filter_single: { email },
            })),
          },
        },
      }))
      .run(client);
  },
  zod$({
    id: z.string(),
  }),
);

export const useCurrentBookshelf = routeLoader$(async (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const email = session?.user?.email;
  const client = await getClient();
  if (!email) throw new Error("Not authenticated");
  const user = await getBookshelf(client, { email });
  return user?.bookShelf ?? [];
});

export default component$(() => {
  const club = useClub();
  const nameSig = useSignal("");
  const createSessionAction = useCreateSession();
  const currentSession = useComputed$(() => club.value.currentSession);
  const bookShelfSig = useCurrentBookshelf();
  const addRecommendationAction = useAddBookRecommendation();
  const voteAction = useVote();
  const session = useAuthSession();
  return (
    <div class="p-4">
      <h2 class="text-3xl">{club.value.name}</h2>
      {/* <h3>Members</h3>
      <ul>
        {club.value?.members.map(({ name, id }) => <li key={id}>{name}</li>)}
      </ul> */}
      {!currentSession.value && (
        <>
          <p>You have no active reading session. Create one now!</p>
          <ModalWrapper>
            <ModalTrigger>
              <Button>Create Session</Button>
            </ModalTrigger>
            <Modal>
              <ModalHeader>
                <h2 class="text-lg font-bold">Create Reading Session</h2>
              </ModalHeader>
              <ModalContent>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      class="col-span-3"
                      bind:value={nameSig}
                    />
                  </div>
                </div>
              </ModalContent>
              <ModalFooter>
                <Button
                  onClick$={() => {
                    createSessionAction.submit({ name: nameSig.value });
                    nameSig.value = "";
                  }}
                >
                  Save changes
                </Button>
              </ModalFooter>
            </Modal>
          </ModalWrapper>{" "}
        </>
      )}
      {currentSession.value?.selectedBook && (
        <>
          <h3>Currently Reading: {currentSession.value.selectedBook.title}</h3>
        </>
      )}
      {currentSession.value && !currentSession.value.selectedBook && (
        <>
          <h3>
            Reading Session: {currentSession.value.name} underway. Lets vote on
            books!
          </h3>
          <div class="flex gap-4">
            {currentSession.value.bookRecommendations.map(
              ({ id, book, votes, voters }) => {
                const email = session.value?.user?.email;
                const canVote =
                  email && !voters.find((user) => user.email === email);
                return (
                  <BookCard
                    key={id}
                    title={book.title}
                    description={book.description}
                    imgUrl={book.imgUrl}
                  >
                    <p>Vote: {votes}</p>
                    {canVote && (
                      <Button
                        class="absolute bottom-2 right-2 bg-darkest hover:border-2 hover:border-darkest hover:bg-light hover:text-darkest"
                        onClick$={() => voteAction.submit({ id })}
                      >
                        Vote!
                      </Button>
                    )}{" "}
                  </BookCard>
                );
              },
            )}
          </div>
          <ModalWrapper>
            <ModalTrigger>
              <Button class="mt-2">Add Book</Button>
            </ModalTrigger>
            <Modal>
              <ModalHeader>
                <h2 class="text-lg font-bold">Vote on a book</h2>
              </ModalHeader>
              <ModalContent>
                <div class="flex flex-col">
                  {bookShelfSig.value.map((book) => (
                    <div key={book.id} class="flex">
                      <p>{book.title}</p>
                      <Button
                        class="ml-auto"
                        onClick$={() => {
                          addRecommendationAction.submit({
                            bookId: book.id,
                            id: currentSession.value!.id,
                          });
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </ModalContent>
              <ModalFooter>
                <Button
                  onClick$={() => {
                    createSessionAction.submit({ name: nameSig.value });
                    nameSig.value = "";
                  }}
                >
                  Save changes
                </Button>
              </ModalFooter>
            </Modal>
          </ModalWrapper>
        </>
      )}
      <ul>
        {club.value.readingSessions.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
});
