"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import useSidebarStore from "@/store/useSidebar";
import LiveBadge from "./live-badge";

interface UserAvatarProps extends VariantProps<typeof avatarSize> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const avatarSize = cva("", {
  variants: {
    size: {
      default: "h-8 w-8 rounded-full",
      sm: "h-9 w-9 rounded-full",
      lg: "h-11 w-11 rounded-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function UserAvatar({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          avatarSize({ size }),
          isLive
            ? "ring-rose-500 ring-2 border-background border"
            : "bg-slate-100"
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute translate-x-0.5 bottom-0 translate-y-1/2 left-0  ">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSize> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn("rounded-full", avatarSize({ size }))}></Skeleton>
  );
};

export default UserAvatar;
