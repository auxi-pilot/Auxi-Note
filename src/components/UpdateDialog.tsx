import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppUpdateStore } from "@/store/useAppUpdateStore";
import { toast } from "sonner";
import { useState } from "react";
import { relaunch } from "@tauri-apps/plugin-process";

export const UpdateDialog = () => {
  const [currentState, setCurrentState] = useState<string>("updateAvailable");
  const {
    showAppUpdateDialog,
    closeAppUpdateDialog,
    appUpdateInformation,
    appUpdate,
  } = useAppUpdateStore();
  const handleDownloadAndInstall = async () => {
    try {
      setCurrentState("updateDownloading");
      await appUpdate?.downloadAndInstall();
      setCurrentState("updateDownloadFinished");
    } catch (error) {
      toast.error("Failed to start update. Please try again later.");
    }
  };
  const handleAppRestart = async () => {
    await relaunch();
  };
  return (
    showAppUpdateDialog && (
      <Dialog open={showAppUpdateDialog} onOpenChange={closeAppUpdateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Available</DialogTitle>
            {currentState === "updateAvailable" && (
              <DialogDescription>
                A new version of the Auxi-Note is available. Would you like to
                update now?
                <br></br>
                <span>{appUpdateInformation}</span>
              </DialogDescription>
            )}
            {currentState === "updateDownloading" && (
              <DialogDescription>
                Please wait, app update is being downloaded and installed
              </DialogDescription>
            )}
            {currentState === "updateDownloadFinished" && (
              <DialogDescription>
                App update is downloaded and installed, the App should be
                restarted
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => closeAppUpdateDialog()}>
              Later
            </Button>
            {currentState === "updateAvailable" && (
              <Button onClick={handleDownloadAndInstall}>Update now</Button>
            )}
            {currentState === "updateDownloading" && (
              <Button disabled={true}>Downloading</Button>
            )}
            {currentState === "updateDownloadFinished" && (
              <Button onClick={handleAppRestart}>Restart app?</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};
