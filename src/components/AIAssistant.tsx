import { Bot, MessageCircle, X, Pencil, LightbulbIcon, LayoutTemplate, Paperclip, AtSign, ArrowUp, Speech, Coffee, Book, Code, FileText, Mail, Settings, Search } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import useAIStore from "@/store/useAIStore";

const AIAssistant = () => {
  const { isOpen, toggleOpen } = useAIStore();

  const suggestedActions = [
    { icon: <Pencil className="w-4 h-4" />, text: "Draft anything" },
    { icon: <LightbulbIcon className="w-4 h-4" />, text: "Brainstorm ideas" },
    { icon: <LayoutTemplate className="w-4 h-4" />, text: "Browse templates" },
    { icon: <Speech className="w-4 h-4" />, text: "Start a conversation" },
    { icon: <Coffee className="w-4 h-4" />, text: "Get recommendations" },
    { icon: <Book className="w-4 h-4" />, text: "Learn something new" }
  ];

  const draftActions = [
    { icon: <FileText className="w-4 h-4" />, text: "Draft a document" },
    { icon: <Mail className="w-4 h-4" />, text: "Write an email" },
    { icon: <Code className="w-4 h-4" />, text: "Generate code" },
    { icon: <Settings className="w-4 h-4 text-gray-400" />, text: "Configure settings", disabled: true }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[400px] rounded-lg glass shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between p-4 border-b border-border/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg">Hi! How can I help you today?</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={toggleOpen}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="px-4 py-2">
              <div className="text-sm text-muted-foreground mb-2">Suggested</div>
              <div className="space-y-2">
                {suggestedActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors text-left"
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="text-sm text-muted-foreground mb-2">Draft</div>
              <div className="space-y-2">
                {draftActions.map((action, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-md transition-colors text-left",
                      action.disabled 
                        ? "text-muted-foreground cursor-not-allowed" 
                        : "hover:bg-accent text-foreground"
                    )}
                    disabled={action.disabled}
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border/10">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-accent">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ask anything or select..."
                className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Paperclip className="w-4 h-4" />
                <AtSign className="w-4 h-4" />
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <ArrowUp className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Button
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-105 bg-primary hover:bg-primary/90",
          isOpen && "rotate-180"
        )}
        onClick={toggleOpen}
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>
    </div>
  );
};

export default AIAssistant;