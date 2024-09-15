"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
function CopyBtn({ value }: { value?: string | null }) {
  const [isCopied, setICopied] = useState(false);

  const Icon = isCopied ? CheckCheck : CopyIcon;

  return (
    <div>
      <Button
        variant="outline"
        className="bg-muted-foreground border-none"
        onClick={() => {
          if (!value) {
            toast.error("Nothing to copy! Please generate a key first");
            return;
          }
          navigator.clipboard.writeText(value).then(() => {
            toast.success("Copied!");
          });

          setICopied(true);
          setTimeout(() => {
            setICopied(false);
          }, 3000);
        }}
      >
        <Icon />
      </Button>
    </div>
  );
}
export default CopyBtn;
