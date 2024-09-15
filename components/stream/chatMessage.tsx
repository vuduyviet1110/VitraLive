import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";
interface ChatMessageProps {
  message: ReceivedChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const color = stringToColor(message.from?.name || "");
  return (
    <div className="flex items-center p-2 space-x-1">
      <div className="text-sm text-slate-500">
        {format(message.timestamp, "HH:mm")}
      </div>
      <div className="flex flex-wrap items-baseline  gap-1 grow">
        <p className="text-base font-semibold whitespace-nowrap">
          {message.from?.name}
        </p>
        :<p className="text-sm text-slate-400 break-all">{message.message}</p>
      </div>
    </div>
  );
};
