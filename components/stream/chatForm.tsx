"use client";

import { useState } from "react";
import useChatSideBar from "@/store/useChatSidebar";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChatInfo } from "./chatInfo";

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isDelayChat: boolean;
  isOnlyFollowerOnly: boolean;
  isHidden: boolean;
  isFollowing: boolean;
}

export default function ChatForm({
  onSubmit,
  onChange,
  value,
  isDelayChat,
  isOnlyFollowerOnly,
  isHidden,
  isFollowing,
}: ChatFormProps) {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isOnlyFollowerOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || isDisabled) {
      return;
    }
    if (!isDelayBlocked && isDelayChat) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="flex flex-col items-center w-full justify-between">
        <ChatInfo
          isDelayChat={isDelayChat}
          isOnlyFollowerOnly={isOnlyFollowerOnly}
        />
        <div className="w-full flex mt-1 border-b border-white/10">
          <Input
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "border-white/10 rounded-br-none text-black rounded-tr-none",
              (isOnlyFollowerOnly || isDelayChat) && "rounded-t-none border-t-0"
            )}
            value={value}
            disabled={isDisabled}
            maxLength={300}
            placeholder="Enter message"
          ></Input>

          <Button
            type="submit"
            size="sm"
            disabled={isDisabled}
            variant="default"
            className="h-full rounded-bl-none  rounded-tl-none "
            onClick={onSubmit}
          >
            Send
          </Button>
        </div>
      </div>
    </form>
  );
}
