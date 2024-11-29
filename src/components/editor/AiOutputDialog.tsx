import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useAIStore from "@/store/useAIStore";
import { Skeleton } from "@/components/ui/skeleton";

interface AIOutputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
  isLoading?: boolean;
}

const AIOutputDialog = ({
  isOpen,
  onClose,
  output,
  isLoading = false,
}: AIOutputDialogProps) => {
  const { closeOutput, isOutputLoading } = useAIStore();
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        description: "Copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy text",
      });
    }
  };

  return (
    isOpen && (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="z-10000 sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>AI Assistant Output</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {isLoading || isOutputLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                  <div className="absolute inset-2 border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin animate-reverse" />
                </div>
                <div className="text-sm text-muted-foreground animate-pulse">
                  AI Assistant is thinking...
                </div>
              </div>
            ) : (
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] resize-none"
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button onClick={closeOutput}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default AIOutputDialog;
