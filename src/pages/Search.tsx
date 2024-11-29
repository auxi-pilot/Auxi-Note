import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, X } from "lucide-react";
import { searchNotes } from "@/utils/search";
import { listNotes } from "@/models/notes";
import useReactivity from "@/hooks/useReactivity";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { DialogOverlay } from "@radix-ui/react-dialog";

interface SearchProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const Search = ({ isOpen, onOpenChange }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const notes = useReactivity(() => listNotes());

  const searchResults = searchQuery.trim()
    ? searchNotes(notes || [], searchQuery)
    : [];

  const truncateContent = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      const textContent = parsed
        .map(
          (block: any) =>
            block.content?.map((c: any) => c.text || "").join(" ") || ""
        )
        .join(" ");
      return textContent.length > 100
        ? textContent.substring(0, 100) + "..."
        : textContent;
    } catch (e) {
      return "Unable to parse content";
    }
  };
  return isOpen ? (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <DialogOverlay />
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Search Notes</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            autoFocus
          />

          <ScrollArea className="h-[60vh]">
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((note) => (
                  <Link
                    key={note.id}
                    to={`/note/${note.id}`}
                    onClick={() => {
                      onOpenChange(false);
                      setSearchQuery("");
                    }}
                    className="flex flex-col space-y-1 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <p className="font-medium">{note.title || "Untitled"}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {truncateContent(note.content)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {note.updatedAt ? format(note.updatedAt, "PPp") : "Never"}
                    </p>
                  </Link>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <p className="text-center text-muted-foreground">
                No notes found
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                Start typing to search notes
              </p>
            )}
          </ScrollArea>
        </div>
        <DialogClose
          onClick={() => {
            onOpenChange(false);
          }}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  ) : (
    <></>
  );
};

export default Search;
