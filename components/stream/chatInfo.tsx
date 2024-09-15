import { useMemo } from "react";
import Hint from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isDelayChat: boolean;
  isOnlyFollowerOnly: boolean;
}

export const ChatInfo = ({
  isDelayChat,
  isOnlyFollowerOnly,
}: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isOnlyFollowerOnly && !isDelayChat) {
      return "Only followers can chat";
    }
    if (isDelayChat && !isOnlyFollowerOnly) {
      return "Messages are delayed by default (3s)";
    }

    if (isDelayChat && isOnlyFollowerOnly) {
      return "Messages are delayed by default (3s) and only followers can chat";
    }
    return "";
  }, [isDelayChat, isOnlyFollowerOnly]);

  const label = useMemo(() => {
    if (isOnlyFollowerOnly && !isDelayChat) {
      return "Only followers ";
    }
    if (isDelayChat && !isOnlyFollowerOnly) {
      return "slow mode ";
    }

    if (isDelayChat && isOnlyFollowerOnly) {
      return " Only followers and slow mode";
    }

    return "";
  }, [isDelayChat, isOnlyFollowerOnly]);

  if (!isDelayChat && !isOnlyFollowerOnly) return null;

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint} align="center" side="left">
        <Info className="w-4 h-4" />
      </Hint>
      <p className="text-sm semi-bold">{label}</p>
    </div>
  );
};
