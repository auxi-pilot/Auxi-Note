import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTheme } from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type SettingsTab = "theme" | "ai";

export const SettingsDialog = () => {
  const [selectedTab, setSelectedTab] = useState<SettingsTab>("theme");
  const { theme, toggleTheme } = useTheme();
  const {
    aiEnabled,
    lmstudioApiUrl,
    setAISettings,
    loadSettings,
    isSettingsDialogOpen,
    closeSettingDialog,
  } = useSettingsStore();
  const [tempAiEnabled, setTempAiEnabled] = useState(aiEnabled);
  const [tempAiApiUrl, setTempAiApiUrl] = useState(lmstudioApiUrl);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    setTempAiEnabled(aiEnabled);
    setTempAiApiUrl(lmstudioApiUrl);
  }, [aiEnabled, lmstudioApiUrl]);

  const handleSave = async () => {
    await setAISettings(tempAiEnabled, tempAiApiUrl);
    toast.success("Settings saved successfully");
    closeSettingDialog();
  };

  return (
    isSettingsDialogOpen && (
      <Dialog open={isSettingsDialogOpen} onOpenChange={closeSettingDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogClose asChild></DialogClose>
          </DialogHeader>
          <div className="flex gap-6 h-[400px]">
            <div className="w-48 border-r pr-4 space-y-2">
              <button
                onClick={() => setSelectedTab("theme")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedTab === "theme"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                Theme
              </button>
              <button
                onClick={() => setSelectedTab("ai")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedTab === "ai"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                AI Assistant
              </button>
            </div>
            <div className="flex-1 p-4">
              {selectedTab === "theme" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme Settings</h3>
                  <div className="flex items-center justify-between">
                    <Label>Dark Mode</Label>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                </div>
              )}
              {selectedTab === "ai" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">AI Assistant Settings</h3>
                  <div className="flex items-center justify-between">
                    <Label>Enable AI Assistant</Label>
                    <Switch
                      checked={tempAiEnabled}
                      onCheckedChange={setTempAiEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LM Studio API URL</Label>
                    <Input
                      value={tempAiApiUrl}
                      onChange={(e) => setTempAiApiUrl(e.target.value)}
                      disabled={!tempAiEnabled}
                      placeholder="http://localhost:1234/v1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};
