import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const SidebarHeader = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) => (
  <div className="p-4 flex items-center justify-between">
    <Link
      to="/"
      className={cn(
        "flex items-center space-x-2 px-2 py-1.5 rounded-md",
        !isCollapsed && "hover:bg-accent cursor-pointer"
      )}
    >
      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-primary">A</span>
      </div>
      {!isCollapsed && <span className="font-medium">Auxi Note</span>}
    </Link>
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <ChevronRight
        className={cn(
          "h-4 w-4 transition-transform",
          isCollapsed ? "rotate-0" : "rotate-180"
        )}
      />
    </Button>
  </div>
);