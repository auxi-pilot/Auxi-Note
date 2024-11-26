import { FileText, Plus, Ellipsis } from "lucide-react";
import { NavItem } from "../sidebar/NavItem";
import { Note } from "@/models/notes";

interface NotesListProps {
  notes: Note[];
  isCollapsed: boolean;
  onPin: (noteId: string, isPinned: boolean) => void;
  onDelete: (noteId: string) => void;
  onNewNote: () => void;
  onShowMore?: () => void;
  onSelect?: () => void;
  totalNotes?: number;
}

export const NotesList = ({
  notes,
  isCollapsed,
  onPin,
  onDelete,
  onNewNote,
  onShowMore,
  onSelect,
  totalNotes = notes.length,
}: NotesListProps) => {
  return (
    <div className="mt-1 space-y-1">
      {notes.map((note) => (
        <NavItem
          key={note.id}
          icon={FileText}
          label={note.title || "Untitled"}
          path={`/note/${note.id}`}
          isCollapsed={isCollapsed}
          onPin={() => onPin(note.id, note.isPinned || false)}
          onDelete={() => onDelete(note.id)}
          isPinned={note.isPinned}
          onSelect={onSelect}
        />
      ))}
      {!isCollapsed && onShowMore && totalNotes > 5 && (
        <button
          onClick={onShowMore}
          className="flex items-center space-x-2 w-full px-2 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Ellipsis className="w-4 h-4 flex-shrink-0" />
          <span>More Notes</span>
        </button>
      )}
      {!isCollapsed && (
        <button
          onClick={onNewNote}
          className="flex items-center space-x-2 w-full px-2 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Create new note</span>
        </button>
      )}
    </div>
  );
};