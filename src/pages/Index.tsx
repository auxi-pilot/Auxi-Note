import Editor from "@/components/Editor";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="max-w-4xl mx-auto h-[600px]">
      <ScrollArea className="h-full w-full">
        <Editor />
      </ScrollArea>
    </div>
  );
};

export default Index;