import { Block } from "@blocknote/core";
import { createIndex, Collection, createLocalStorageAdapter } from "signaldb";
import maverickjsReactivityAdapter from "signaldb-plugin-maverickjs";

export type Note = {
  id: string;
  title: string;
  content: string;
  isPinned?: boolean;
  updatedAt?: number;
  createdAt?: number;
};

const Notes = new Collection<Note>({
  reactivity: maverickjsReactivityAdapter,
  persistence: createLocalStorageAdapter("auxi-note-notes"),
  indices: [createIndex("updatedAt")],
});

Notes.on("persistence.error", (error) => {
  // eslint-disable-next-line no-console
  console.error("persistence.error", error);
});

export const createNewNote = (): string => {
  const note = Notes.insert({
    title: "New note",
    content: JSON.stringify([
      {
        type: "heading",
        id: "new-note-heading",
        props: {
          textAlignment: "left",
          level: 1,
          backgroundColor: "default",
          textColor: "default",
        },
        content: [
          {
            type: "text",
            text: "New Note",
            styles: {},
          },
        ],
        children: [],
      },
    ]),
    isPinned: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return note;
};

export const togglePinNote = (noteId: string, makeItPinned: boolean) => {
  const note = Notes.updateOne(
    { id: noteId },
    {
      $set: { isPinned: makeItPinned },
    }
  );
  return note;
};

export const updateNote = (noteId: string, jsonBlocks: Block[]) => {
  const content = JSON.stringify(jsonBlocks);
  const title = jsonBlocks[0]?.content?.[0]?.text || "Untitled";
  const note = Notes.updateOne(
    { id: noteId },
    {
      $set: { title, content, updatedAt: Date.now() },
    }
  );

  return note;
};

export const deleteNote = (noteId: string) => {
  return Notes.removeOne({ id: noteId });
};

export const getNote = (noteId: string) => {
  return Notes.findOne({ id: noteId });
};

export const listNotes = () => {
  return Notes.find({}, { sort: { createdAt: 1 } }).fetch();
};

export const pinnedNotes = () => {
  return Notes.find({ isPinned: true }, { sort: { createdAt: 1 } }).fetch();
};

export default Notes;
