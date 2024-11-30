import { create } from "zustand";
import type { Update } from "@tauri-apps/plugin-updater";
interface AppUpdateStore {
  showAppUpdateDialog: boolean;
  appUpdateInformation?: string;
  appUpdate?: Update;
  openAppUpdateDialog: (
    appUpdateInformation: string,
    appUpdate: Update
  ) => void;
  closeAppUpdateDialog: () => void;
}
export const useAppUpdateStore = create<AppUpdateStore>((set) => ({
  showAppUpdateDialog: false,
  openAppUpdateDialog: (appUpdateInformation: string, appUpdate: Update) => {
    set({ showAppUpdateDialog: true, appUpdateInformation, appUpdate });
  },
  closeAppUpdateDialog: () => set({ showAppUpdateDialog: false }),
}));
