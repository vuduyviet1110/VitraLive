"use client";

import { ArrowRightFromLine, ArrowLeftFromLine } from "lucide-react";
import useChatSideBar from "@/store/useChatSidebar";
import Hint from "../hint";

const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSideBar();
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const label = collapsed ? "Expand" : "Collapse";
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  return (
    <Hint label={label} side="right" align="center" asChild>
      <button
        className="flex m-3 justify-between"
        onClick={() => onToggle()}
        role="button"
      >
        <div className="text-lg font-bold tracking-tighter ">
          <Icon />
        </div>
      </button>
    </Hint>
  );
};

export default ChatToggle;
