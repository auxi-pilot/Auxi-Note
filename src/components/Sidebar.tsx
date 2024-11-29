import { useState, useEffect } from "react";
import { Search, FileText, X, Trash, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavItem } from "./sidebar/NavItem";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewNote,
  listNotes,
  deleteNote,
  togglePinNote,
  pinnedNotes,
} from "@/models/notes";
import useReactivity from "@/hooks/useReactivity";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { NotesList } from "./notes/NotesList";
import SearchDialog from "@/pages/Search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { SettingsDialog } from "./settings/SettingsDialog";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMorePanel, setShowMorePanel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const notes = useReactivity(() => listNotes());
  const pinned = useReactivity(() => pinnedNotes());
  const { openSettingDialog } = useSettingsStore();

  const navItems = [
    {
      icon: Search,
      label: "Search",
      onClick: () => setShowSearch(true),
    },
  ];
  const bottomItems = [
    {
      icon: Settings,
      path: "#",
      label: "Settings",
      onClick: () => {
        console.log("settings");
        openSettingDialog();
      },
    },
  ];

  // Auto close more panel if there are no older notes
  useEffect(() => {
    if (notes && notes.length <= 5) {
      setShowMorePanel(false);
    }
  }, [notes]);

  const handleNewNote = async () => {
    const newNoteId = await createNewNote();
    navigate(`/note/${newNoteId}`);
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNote(noteId);
    toast.success("Note deleted");
  };

  const handlePinNote = async (noteId: string, currentPinState: boolean) => {
    await togglePinNote(noteId, !currentPinState);
    toast.success(currentPinState ? "Note unpinned" : "Note pinned");
  };

  // Sort notes to put the selected note at the top
  const sortedNotes = notes?.slice().sort((a, b) => {
    if (a.id === noteId) return -1;
    if (b.id === noteId) return 1;
    return 0;
  });

  // Show first 5 notes in the main list
  const recentNotes = sortedNotes?.slice(0, 5) || [];
  // Show remaining notes in the older notes panel
  const olderNotes = sortedNotes?.slice(5) || [];

  return (
    <div className="relative flex">
      <aside
        className={cn(
          "h-screen flex flex-col bg-sidebar-background border-r border-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              onSelect={item.onClick}
              isCollapsed={isCollapsed}
            />
          ))}

          {!isCollapsed && (
            <>
              <Separator className="my-2" />
              <Accordion type="single" collapsible defaultValue="pinned">
                <AccordionItem value="pinned" className="border-none">
                  <AccordionTrigger className="px-2 py-1.5 hover:no-underline">
                    <span className="font-medium">Pinned Notes</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {pinned && pinned.length > 0 ? (
                      <NotesList
                        notes={pinned}
                        totalNotes={pinned.length}
                        isCollapsed={isCollapsed}
                        onPin={handlePinNote}
                        onDelete={handleDeleteNote}
                        onNewNote={handleNewNote}
                        onSelect={() => setShowMorePanel(false)}
                      />
                    ) : (
                      <p className="text-muted-foreground px-2">
                        No pinned notes yet
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}

          <div className="mt-4">
            {!isCollapsed && (
              <>
                <Separator className="my-2" />
                <div className="px-2 py-1.5">
                  <span className="font-medium">Notes</span>
                </div>
              </>
            )}
            <NotesList
              notes={recentNotes}
              totalNotes={notes?.length || 0}
              isCollapsed={isCollapsed}
              onPin={handlePinNote}
              onDelete={handleDeleteNote}
              onNewNote={handleNewNote}
              onShowMore={() => setShowMorePanel(!showMorePanel)}
              onSelect={() => setShowMorePanel(false)}
              showCreateNoteButton={true}
            />
          </div>
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          {bottomItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              onSelect={item.onClick}
              isCollapsed={isCollapsed}
            />
          ))}
          <ThemeToggle />
        </div>
      </aside>

      {showMorePanel && olderNotes.length > 0 && (
        <div
          className={cn(
            "absolute left-full top-0 h-screen w-64 bg-sidebar-background border-r border-border z-50",
            "animate-in slide-in-from-right duration-300"
          )}
        >
          <div className="p-4 flex items-center justify-between border-b border-border">
            <span className="font-medium">Older Notes</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowMorePanel(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[calc(100vh-57px)] overflow-y-auto p-3 space-y-1">
            <NotesList
              notes={olderNotes}
              totalNotes={notes?.length || 0}
              isCollapsed={false}
              onPin={handlePinNote}
              onDelete={handleDeleteNote}
              onNewNote={handleNewNote}
              onSelect={() => setShowMorePanel(false)}
            />
          </div>
        </div>
      )}

      <SearchDialog isOpen={showSearch} onOpenChange={setShowSearch} />
      <SettingsDialog />
    </div>
  );
};

export default Sidebar;
