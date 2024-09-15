"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Hint from "@/components/hint";
import useVideoVolume from "@/store/useVolumeStore";

export const VolumeControl = ({
  onToggleVolume,
  OnVolumeChange,
}: {
  onToggleVolume: () => void;
  OnVolumeChange: (volume: number) => void;
}) => {
  const { volume, isMuted, VolumeChange } = useVideoVolume();

  const isAboveHalf = volume > 50;
  // console.log(volume, isMuted);
  let Icon = Volume1;
  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";
  return (
    <div className="flex items-center gap-2">
      <Hint label={label} side="top" align="start" asChild>
        <button
          onClick={onToggleVolume}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="w-5 h-5" />
        </button>
      </Hint>
      <Slider
        max={100}
        step={1}
        className="w-[6rem] cursor-pointer"
        onValueChange={([volume]) => OnVolumeChange(volume)}
        value={[volume]}
      />
    </div>
  );
};
