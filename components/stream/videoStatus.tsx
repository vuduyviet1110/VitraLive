"use client";

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import OfflineStream from "./offline";
import LoadingSpinner from "./loadingStream";
import LiveVideo from "./live-video";

export const VideoStatus = ({
  hostName,
  hostIdentity,
}: {
  hostName: string;
  hostIdentity: string;
}) => {
  // lấy ra connection
  const connectionState = useConnectionState();
  // lấy ra identity của host
  const paricipant = useRemoteParticipant(hostIdentity);
  //lọc ra source video của current host
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((t) => t.participant.identity === hostIdentity);

  let content;
  if (!paricipant && connectionState === ConnectionState.Connected) {
    content = <OfflineStream hostname={hostName} />;
  } else if (tracks.length === 0 || !paricipant) {
    content = <LoadingSpinner />;
  } else {
    content = <LiveVideo participant={paricipant} tracks={tracks} />;
  }
  return <div className="aspect-video border-b group relative">{content}</div>;
};
