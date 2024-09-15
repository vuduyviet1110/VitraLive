"use client";

import useChatSideBar, { ChatVariant } from "@/store/useChatSidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chatHeader";
import ChatForm from "./chatForm";
import { Chatlist } from "./chatList";
import { toast } from "sonner";
import { ChatCommunity } from "./chatCommunity";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isDelayChat: boolean;
  isOnlyFollowerOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isDelayChat,
  isOnlyFollowerOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSideBar();

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");

  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(
    () => messages?.sort((a, b) => b.timestamp - a.timestamp),
    [messages]
  );

  const onSubmit = () => {
    if (!send || !value?.trim()) {
      toast.error("Please enter a message");
      setValue("");
      return;
    } else {
      send(value);
      setValue("");
    }
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex  flex-col bg-[#252731] border-t border-slate-600 border-b pt-0 h-[calc(100vh-64px)]">
      <ChatHeader />
      {variant === ChatVariant.Chat && (
        <>
          <Chatlist messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            value={value}
            isDelayChat={isDelayChat}
            isOnlyFollowerOnly={isOnlyFollowerOnly}
            isHidden={isHidden}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.Community && (
        <ChatCommunity
          hostName={hostName}
          viewerName={viewerName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};
