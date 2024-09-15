import { create } from "zustand";

interface VideoVolume {
  volume: number;
  isMuted: boolean;
  VolumeChange: (volume: number) => void;
  onMute: () => void;
  onUnmute: () => void;
}

const useVideoVolume = create<VideoVolume>((set) => ({
  isMuted: false,
  volume: 50,
  VolumeChange(volume) {
    set(() => ({
      volume,
      isMuted: volume === 0 ? true : false,
    }));
  },
  onMute: () => set({ isMuted: true, volume: 0 }),
  onUnmute: () => set({ isMuted: false, volume: 50 }), // Unmuting sets volume back to 50
}));

export default useVideoVolume;
