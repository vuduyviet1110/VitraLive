"use client";

import { TrackReference } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "./fullscreen-contrl";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";
import useVideoVolume from "@/store/useVolumeStore";

interface LiveVideoProps {
  participant: Participant;
  tracks: TrackReference[];
}

const LiveVideo = ({ participant, tracks }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsfullscreen] = useState(false);
  const { volume, isMuted, VolumeChange, onUnmute, onMute } = useVideoVolume();

  const handleVolumeChange = (volume: number) => {
    VolumeChange(volume);
    if (videoRef.current) {
      videoRef.current.muted = volume === 0;
      videoRef.current.volume = volume / 100;
    }
  };

  useEffect(() => {
    handleVolumeChange(0);
  }, []);

  const handleToggleVolume = () => {
    if (isMuted) {
      onUnmute();
      if (videoRef.current !== null) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.5;
      }
    } else {
      onMute();
      if (videoRef.current !== null) {
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
      }
    }
  };
  tracks.forEach((track) => {
    if (videoRef.current) {
      track.publication.track?.attach(videoRef.current);
    }
  });

  const handleToggleScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
      setIsfullscreen(false);
    } else if (wrapperRef.current) {
      wrapperRef.current?.requestFullscreen();
      setIsfullscreen(true);
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsfullscreen(false);
    }
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  return (
    <div ref={wrapperRef} className="relative h-full flex ">
      <video ref={videoRef} width="100%"></video>
      <div className="absolute top-0 h-full  w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute z-[100] bottom-0 w-full flex h-14 justify-between bg-gradient-to-t from-neutral-900 px-4">
          <VolumeControl
            onToggleVolume={handleToggleVolume}
            OnVolumeChange={handleVolumeChange}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={handleToggleScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
