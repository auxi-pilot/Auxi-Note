import { useAppUpdateStore } from "@/store/useAppUpdateStore";
import { invoke } from "@tauri-apps/api/core";
import type { Update } from "@tauri-apps/plugin-updater";
import { check } from "@tauri-apps/plugin-updater";

export const checkAppUpdate = async () => {
  const isTauri = "__TAURI_INTERNALS__" in window;
  if (!isTauri) return;
  const { openAppUpdateDialog } = useAppUpdateStore();
  try {
    const update = await check();
    if (update !== null) {
      const appUpdateInformation = `Version: ${update.version} ${update.date}`;
      openAppUpdateDialog(appUpdateInformation, update);
    }
  } catch (error) {
    console.log(error);
  }
};
