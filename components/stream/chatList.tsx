import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chatMessage";
import { MessageSquare, MessageSquareOff, MessageSquareX } from "lucide-react";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const Chatlist = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-y-2 text-slate-400">
        <p>{isHidden ? "Chat is disabled" : "Welcome to the chat room"}</p>
        <p>{isHidden ? <MessageSquareX /> : <MessageSquare />}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((m, index) => (
        <ChatMessage message={m} key={index} />
      ))}
    </div>
  );
};
