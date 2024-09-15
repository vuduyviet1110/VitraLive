"use client";
import { Follow, User } from "@prisma/client";
import useSidebarStore from "@/store/useSidebar";
import UserItem from "./user-items";

interface FollowingProps {
  data: (Follow & {
    following: User & { stream: { isLive: boolean } | null };
  })[];
}
function FollowingUser({ data }: FollowingProps) {
  const { isCollapsed } = useSidebarStore();

  if (data.length === 0) {
    return (
      <div>
        {!isCollapsed && (
          <p className="text-lg text-muted-foreground font-semibold m-3">
            No Following
          </p>
        )}
      </div>
    );
  }
  if (!data) {
    return (
      <div>
        {!isCollapsed && (
          <p className="text-lg text-muted-foreground font-semibold m-2">
            Login to see Following!
          </p>
        )}
      </div>
    );
  }
  return (
    <div>
      {!isCollapsed && (
        <>
          <p className="text-lg text-muted-foreground font-semibold ml-2 tracking-wide mt-4 mb-1">
            Following
          </p>
          <div className="flex flex-col gap-3">
            {data?.map((user) => (
              <UserItem
                key={user.id}
                username={user.following.username}
                imageUrl={user.following.imageUrl}
                isLive={user.following.stream?.isLive}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FollowingUser;
