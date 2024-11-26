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
  return themeSetting.value == "light" ? "light" : "dark";
};

export const setCurrentTheme = (newTheme: string) => {
  const theme = getCurrentTheme();
  Settings.updateOne({ key: "theme" }, { $set: { value: newTheme } });
};
