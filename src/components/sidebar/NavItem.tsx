import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Pin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteNoteDialog } from "../notes/DeleteNoteDialog";

export const NavItem = ({
  icon: Icon,
  label,
  path,
  isCollapsed,
  onPin,
  onDelete,
  isPinned,
  onSelect,
}: {
  icon: any;
  label: string;
  path?: string;
  isCollapsed: boolean;
  onPin?: () => void;
  onDelete?: () => void;
  isPinned?: boolean;
  onSelect?: () => void;
}) => {
  const location = useLocation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPin?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleClick = () => {
    onSelect?.();
  };

  const handleConfirmDelete = () => {
    const isCurrentNote = location.pathname === path;
    onDelete?.();
    setShowDeleteDialog(false);
    if (isCurrentNote) {
      navigate("/");
    }
  };

  return (
    <>
      <Link
        to={path ?? "#"}
        onClick={handleClick}
        className={cn(
          "group flex items-center justify-between px-2 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
          location.pathname === path && "bg-accent text-accent-foreground"
        )}
      >
        <div className="flex items-center min-w-0">
          <Icon className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="ml-2 truncate">{label}</span>}
        </div>
        {!isCollapsed && onPin && onDelete && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handlePin}
            >
              <Pin
                className={cn("h-4 w-4", isPinned && "fill-current")}
                aria-label="Pin note"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" aria-label="Delete note" />
            </Button>
          </div>
        )}
      </Link>
      <DeleteNoteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        noteTitle={label}
      />
    </>
  );
};
