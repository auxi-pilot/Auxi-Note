import Editor from "@/components/Editor";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="mx-auto editor">
      <ScrollArea className="h-full w-full">
        <Editor />
      </ScrollArea>
    </div>
  );
};

export default Index;
