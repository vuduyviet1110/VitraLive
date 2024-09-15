"use client";

import { Maximize, Minimize } from "lucide-react";

import Hint from "@/components/hint";

interface fullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}
export const FullscreenControl = ({
  isFullscreen,
  onToggle,
}: fullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  return (
    <div className="flex items-center justify-center gap-4">
      <Hint
        label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        side="top"
        align="start"
        asChild
      >
        <button
          className="rounded-lg p-1.5 text-white hover:bg-white/15"
          onClick={() => onToggle()}
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
