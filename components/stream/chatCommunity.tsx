"use client";

import { useParticipants } from "@livekit/components-react";
import { Input } from "../ui/input";
import { useState, useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./communityItem";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const participants = useParticipants();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue(value, 500);
  const Searchkeyword = debouncedValue.toString().toLowerCase();
  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filterParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((p) => {
      return p.name?.toLowerCase().includes(Searchkeyword);
    });
  }, [participants, Searchkeyword]);

  if (isHidden) {
    return (
      <div className="flex justify-center flex-1 items-center">
        <p>Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        value={value}
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
      />
      <ScrollArea className="gap-y-4 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {participants.map((p) => (
          <CommunityItem
            key={p.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={p.name}
            participantIdentity={p.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
