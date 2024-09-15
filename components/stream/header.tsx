"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import UserAvatar from "../user-avatar";
import { VerifiedMark } from "../verified-mark";
import { UserIcon } from "lucide-react";
import { Actions } from "./actions";

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  isFollowing: boolean;
}

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  name,
  isFollowing,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  return (
    <div className="flex  items-center  mx-8  justify-between">
      <div className="flex  items-center gap-x-4 space-y-2">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          showBadge
          isLive={isLive}
        />

        <div className="space-y-2 text-slate-300">
          <div className="flex items-center gap-x-2">
            <div className="text-lg font-semibold">{hostName}</div>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold flex-1 truncate">{name}</p>

          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>

      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};
