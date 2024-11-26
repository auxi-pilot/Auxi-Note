import { Plus, Database, Sparkles, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { createNewNote } from "@/models/notes";

const WelcomeHero = () => {
  const navigate = useNavigate();

  const handleNewNote = () => {
    const newNoteId = createNewNote();
    console.log(newNoteId);
    navigate(`/note/${newNoteId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] max-w-3xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Your Notes
        </h1>
        <p className="text-lg text-muted-foreground">
          Create and manage your notes with powerful features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="flex flex-col items-center p-6 space-y-4 rounded-lg border bg-card text-card-foreground">
          <FileText className="h-12 w-12 text-primary" />
          <h3 className="text-lg font-semibold">Rich Text Editor</h3>
          <p className="text-sm text-muted-foreground text-center">
            Write in Markdown or use the rich text editor for formatting
          </p>
        </div>

        <div className="flex flex-col items-center p-6 space-y-4 rounded-lg border bg-card text-card-foreground">
          <Database className="h-12 w-12 text-primary" />
          <h3 className="text-lg font-semibold">Sync with Supabase</h3>
          <p className="text-sm text-muted-foreground text-center">
            Keep your notes synced across all your devices
          </p>
        </div>

        <div className="flex flex-col items-center p-6 space-y-4 rounded-lg border bg-card text-card-foreground">
          <Sparkles className="h-12 w-12 text-primary" />
          <h3 className="text-lg font-semibold">AI Assistant</h3>
          <p className="text-sm text-muted-foreground text-center">
            Get help with writing and organizing your notes
          </p>
        </div>
      </div>

      <Button onClick={handleNewNote} size="lg" className="mt-8">
        <Plus className="mr-2 h-4 w-4" /> Create Your First Note
      </Button>
    </div>
  );
};

export default WelcomeHero;
