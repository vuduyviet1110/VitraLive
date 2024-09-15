import LiveBadge from "@/components/live-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/store/useSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

function UserItem({ username, imageUrl, isLive }: UserItemProps) {
  const { isCollapsed } = useSidebarStore();
  const pathname = usePathname();
  const href = `${username}`;
  const isActive = pathname === href;
  console.log("isLive", isLive);
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "h-12 w-full hover:bg-current relative ",
        isCollapsed ? "justify-center" : "justify-start",
        isActive && "bg-primary"
      )}
    >
      <Link href={href}>
        <UserAvatar
          size="default"
          isLive={isLive}
          username={username}
          imageUrl={imageUrl}
        />
        {!isCollapsed && (
          <span className="ml-2 text-slate-200 truncate ">{username}</span>
        )}
        {!isCollapsed && isLive && (
          <LiveBadge className=" relative ml-auto translate-y-0.5 " />
        )}
      </Link>
    </Button>
  );
}

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2 ">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
export default UserItem;
