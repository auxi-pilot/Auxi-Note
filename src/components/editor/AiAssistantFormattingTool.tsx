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
import useAIStore from "@/store/useAIStore";
import {
  proofread,
  setToneToText,
  summarizeContentPrompt,
} from "@/lib/llm_invoker";

export const AIAssistantFormattingTool = () => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  const selectedBlocks = useSelectedBlocks(editor);

  const [block, setBlock] = useState(editor.getTextCursorPosition().block);

  const { openOutput, setOutputLoading } = useAIStore();

  useEditorContentOrSelectionChange(() => {
    setBlock(editor.getTextCursorPosition().block);
  }, editor);

  if (!editor.isEditable) {
    return null;
  }

  const handleAIAssistantSummarize = async (selectedText: string) => {
    // Example of triggering the output modal with some sample text
    openOutput("");
    setOutputLoading(true);
    const output = await summarizeContentPrompt(selectedText);
    setOutputLoading(false);
    openOutput(output);
  };

  const handleAIAssistantProofread = async (selectedText: string) => {
    // Example of triggering the output modal with some sample text
    openOutput("");
    setOutputLoading(true);
    const output = await proofread(selectedText);
    setOutputLoading(false);
    openOutput(output);
  };

  const handleAIAssistantSetTone = async (
    selectedText: string,
    toneType: string
  ) => {
    openOutput("");
    setOutputLoading(true);
    const output = await setToneToText(selectedText, toneType);
    setOutputLoading(false);
    openOutput(output);
  };

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
            handleAIAssistantSummarize(editor.getSelectedText());
          }}
          className="w-full"
        >
          Summarize
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            handleAIAssistantProofread(editor.getSelectedText());
          }}
          className="w-full"
        >
          Proofread
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            handleAIAssistantSetTone(editor.getSelectedText(), "professional");
          }}
          className="w-full"
        >
          Change to professional tone
        </Button>
      </PopoverContent>
    </Popover>
  );
};
