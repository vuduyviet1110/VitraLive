"use client";

import ChatToggle from "./ChatToggle";
import VariantToggle from "./variantToggle";

export const ChatHeader = () => {
  return (
    <div className="relative p-3 border-3">
      <div className="absolute left-2 top-1 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="text-xl text-slate-300 tracking-wide text-center font-semibold">
        My Stream
      </p>
      <div className="absolute right-2 top-1">
        <VariantToggle />
      </div>
    </div>
  );
};
