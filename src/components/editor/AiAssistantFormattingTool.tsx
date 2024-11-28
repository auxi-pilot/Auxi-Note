import {
  Block,
  BlockSchema,
  Dictionary,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import {
  ComponentProps,
  useBlockNoteEditor,
  useComponentsContext,
  useDictionary,
  useEditorContentOrSelectionChange,
  useSelectedBlocks,
} from "@blocknote/react";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Bot, ChevronDown } from "lucide-react";

export const AIAssistantFormattingTool = () => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  const selectedBlocks = useSelectedBlocks(editor);

  const [block, setBlock] = useState(editor.getTextCursorPosition().block);

  useEditorContentOrSelectionChange(() => {
    setBlock(editor.getTextCursorPosition().block);
  }, editor);

  if (!editor.isEditable) {
    return null;
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-10 hover:bg-accent"
        >
          <Bot className="h-6 w-6" />
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 p-1 w-60">
        <Button
          variant="outline"
          onClick={() => {
            // Handle button click
          }}
          className="w-full"
        >
          Summarize
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            // Handle button click
          }}
          className="w-full"
        >
          Proofread
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            // Handle button click
          }}
          className="w-full"
        >
          Change to professional tone
        </Button>
      </PopoverContent>
    </Popover>
  );
};
