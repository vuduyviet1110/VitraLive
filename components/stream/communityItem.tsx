"use client";

import { cn, stringToColor } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Hint from "../hint";
import { useTransition } from "react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string | undefined;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = async () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`You have blocked ${participantName}`);
        })
        .catch(() => {
          toast.error("Action cannot be performed");
        });
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-sm text-sm hover:bg-white/5"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block" side="left" align="center">
          <Button
            onClick={handleBlock}
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MinusCircle />
          </Button>
        </Hint>
      )}
    </div>
  );
};
