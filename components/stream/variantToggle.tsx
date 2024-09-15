"use client";

import { Users, MessageSquareCodeIcon } from "lucide-react";
import useChatSideBar, { ChatVariant } from "@/store/useChatSidebar";
import Hint from "../hint";

const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSideBar();
  const isChat = variant === ChatVariant.Chat;
  const Icon = isChat ? Users : MessageSquareCodeIcon;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.Community : ChatVariant.Chat;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Community" : "Back to Chat";

  return (
    <Hint label={label} side="right" align="center" asChild>
      <button
        className="flex m-3 justify-between"
        onClick={() => onToggle()}
        role="button"
      >
        <div className="text-lg font-bold tracking-tighter ">
          <Icon className="w-5 h-5" />
        </div>
      </button>
    </Hint>
  );
};

export default VariantToggle;
