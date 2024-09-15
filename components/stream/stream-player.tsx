"use client";

import useViewerToken from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { VideoStatus } from "./videoStatus";
import useChatSideBar from "@/store/useChatSidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import ChatToggle from "./ChatToggle";
import { Header } from "./header";
import InfoCard from "./infoCard";
import AboutCard from "./aboutCard";
function StreamPlayer({
  stream,
  user,
  isFollowing,
}: {
  stream: Stream;
  user: User & { stream: Stream | null; _count: { followedBy: number } };
  isFollowing: boolean;
}) {
  const { token, name, identity } = useViewerToken(user.id);

  const { collapsed } = useChatSideBar();
  if (!token || !name || !identity) return <div>Can not watch the stream</div>;
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] text-white right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
          <VideoStatus hostIdentity={user.id} hostName={user.username} />
          <Header
            hostName={user.username}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
          />

          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumnailUrl}
            description={stream.description}
          />

          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1 lg:col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isEnabledChat}
            isDelayChat={stream.isDelayChat}
            isOnlyFollowerOnly={stream.isOnlyFollowerOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export default StreamPlayer;
