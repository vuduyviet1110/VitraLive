"use client";

import useSidebarStore from "@/store/useSidebar";
import { User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-items";
import LiveBadge from "@/components/live-badge";
interface RecomendedUser {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}
function RecomendedUser({ data }: RecomendedUser) {
  const { isCollapsed } = useSidebarStore();
  const showLabel = !isCollapsed && data?.length > 0;
  if (data.length === 0) {
    return <div>No User recomended</div>;
  }
  return (
    <div className="  ">
      {showLabel && (
        <p className="text-lg text-muted-foreground ml-2 tracking-wide font-semibold">
          Recomended
        </p>
      )}
      <div className="text-sm ml-1 mt-2 ">
        {data?.map((user) => (
          <div className="relative" key={user.id}>
            <UserItem
              key={user.externalUserId}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={user.stream?.isLive}
            />
            {isCollapsed && user.stream?.isLive && (
              <LiveBadge className="absolute bottom-0 translate-y-1/3 translate-x-1/2 left-0  " />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const RecomendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3).map((_, i) => <UserItemSkeleton key={i} />)]}
    </ul>
  );
};

export default RecomendedUser;
