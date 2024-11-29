import { getCurrentAISettings, setAISettings } from "@/models/settings";
import { create } from "zustand";

type SettingsState = {
  aiEnabled: boolean;
  lmstudioApiUrl: string;
  isSettingsDialogOpen: boolean;
  openSettingDialog: () => void;
  closeSettingDialog: () => void;
  setAISettings: (enabled: boolean, url: string) => void;
  loadSettings: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  isSettingsDialogOpen: false,
  openSettingDialog() {
    set({ isSettingsDialogOpen: true });
  },
  closeSettingDialog() {
    set({ isSettingsDialogOpen: false });
  },
  aiEnabled: false,
  lmstudioApiUrl: "http://localhost:1234/v1",
  setAISettings: async (enabled: boolean, url: string) => {
    setAISettings(enabled, url);
    set({ aiEnabled: enabled, lmstudioApiUrl: url });
  },
  loadSettings: async () => {
    const { aiEnabled, aiLMStudioApiUrl } = getCurrentAISettings();
    set({
      aiEnabled: aiEnabled,
      lmstudioApiUrl: aiLMStudioApiUrl || "http://localhost:1234/v1",
    });
  },
}));
