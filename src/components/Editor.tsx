import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "@/hooks/useTheme";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
} from "@blocknote/mantine";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { getNote, updateNote } from "@/models/notes";
import WelcomeHero from "./WelcomeHero";

const darkTheme = {
  colors: {
    ...darkDefaultTheme.colors,
    editor: {
      text: "#ffffff",
      background: "#09090b",
    },
  },
} satisfies Theme;
 
const customTheme = {
  light: lightDefaultTheme,
  dark: darkTheme,
};

const NEW_NOTE_HEADING_BLOCK_ID = "new-note-heading";

const Editor = () => {
  const { theme } = useTheme();
  const { noteId } = useParams();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const blockNoteTheme = customTheme[theme];

  const initializeNote = async (currentNoteId) => {
    if (!currentNoteId) return;
    
    const note = getNote(currentNoteId);
    if (note) {
      const noteContent = (JSON.parse(note.content) as PartialBlock[])
      setInitialContent(noteContent);
    }
  };

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  useEffect(() => {
    initializeNote(noteId);
  }, [noteId]);

  if (!noteId) {
    return <WelcomeHero />;
  }

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <BlockNoteView editor={editor} theme={blockNoteTheme} onChange={() => {updateNote(noteId, editor.document);}}/>
  );
};

export default Editor;