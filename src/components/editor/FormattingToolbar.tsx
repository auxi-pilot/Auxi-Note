import "@blocknote/mantine/style.css";
import { useState } from "react";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
import { AIAssistantFormattingTool } from "./AiAssistantFormattingTool";

export const CustomFormattingToolbar = () => {
  return (
    <FormattingToolbar>
      <AIAssistantFormattingTool />

      <BlockTypeSelect key={"blockTypeSelect"} />

      <FileCaptionButton key={"fileCaptionButton"} />
      <FileReplaceButton key={"replaceFileButton"} />

      <BasicTextStyleButton basicTextStyle={"bold"} key={"boldStyleButton"} />
      <BasicTextStyleButton
        basicTextStyle={"italic"}
        key={"italicStyleButton"}
      />
      <BasicTextStyleButton
        basicTextStyle={"underline"}
        key={"underlineStyleButton"}
      />
      <BasicTextStyleButton
        basicTextStyle={"strike"}
        key={"strikeStyleButton"}
      />
      {/* Extra button to toggle code styles */}
      <BasicTextStyleButton key={"codeStyleButton"} basicTextStyle={"code"} />

      <TextAlignButton textAlignment={"left"} key={"textAlignLeftButton"} />
      <TextAlignButton textAlignment={"center"} key={"textAlignCenterButton"} />
      <TextAlignButton textAlignment={"right"} key={"textAlignRightButton"} />

      <ColorStyleButton key={"colorStyleButton"} />

      <NestBlockButton key={"nestBlockButton"} />
      <UnnestBlockButton key={"unnestBlockButton"} />

      <CreateLinkButton key={"createLinkButton"} />
    </FormattingToolbar>
  );
};

export const CustomFormattingToolbarController = () => {
  return (
    <FormattingToolbarController formattingToolbar={CustomFormattingToolbar} />
  );
};
