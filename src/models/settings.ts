import { Collection, createLocalStorageAdapter } from "signaldb";
import maverickjsReactivityAdapter from "signaldb-plugin-maverickjs";

type SettingsDocType = {
  id: string;
  key: string;
  value: string;
};

const Settings = new Collection<SettingsDocType>({
  reactivity: maverickjsReactivityAdapter,
  persistence: createLocalStorageAdapter("auxi-note-settings"),
});

Settings.on("persistence.error", (error) => {
  // eslint-disable-next-line no-console
  console.error("persistence.error", error);
});

export const getCurrentTheme = (): "light" | "dark" => {
  let themeSetting = Settings.findOne({ key: "theme" });
  if (!themeSetting) {
    themeSetting = Settings.insert({
      key: "theme",
      value: "light",
    });
  }
  return themeSetting?.value == "light" ? "light" : "dark";
};

export const setCurrentTheme = (newTheme: string) => {
  const theme = getCurrentTheme();
  Settings.updateOne({ key: "theme" }, { $set: { value: newTheme } });
};

export const getCurrentAISettings = () => {
  let aiEnabled = Settings.findOne({ key: "aiEnabled" });
  let aiLMStudioApiUrl = Settings.findOne({ key: "aiLMStudioApiUrl" });
  if (!aiEnabled) {
    aiEnabled = Settings.insert({
      key: "aiEnabled",
      value: "false",
    });
  }
  if (!aiLMStudioApiUrl) {
    aiLMStudioApiUrl = Settings.insert({
      key: "aiLMStudioApiUrl",
      value: "http://localhost:1234/v1",
    });
  }

  return {
    aiEnabled: aiEnabled && aiEnabled.value === "true" ? true : false,
    aiLMStudioApiUrl: aiLMStudioApiUrl?.value,
  };
};

export const setAISettings = (aiEnabled: boolean, aiLMStudioApiUrl: string) => {
  Settings.updateOne(
    { key: "aiEnabled" },
    { $set: { value: aiEnabled === true ? "true" : "false" } }
  );
  Settings.updateOne(
    { key: "aiLMStudioApiUrl" },
    { $set: { value: aiLMStudioApiUrl } }
  );
};
