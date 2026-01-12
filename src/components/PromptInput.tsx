import { ArrowUp } from "lucide-react";

const PromptInput = () => {
  return (
    <div className="bg-card rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3 max-w-md w-full">
      <div className="flex-1 text-foreground text-sm">
        Ask Lovable to build your saas startup.
        <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 animate-cursor-blink align-middle" />
      </div>
      <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity">
        <ArrowUp className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  );
};

export default PromptInput;
