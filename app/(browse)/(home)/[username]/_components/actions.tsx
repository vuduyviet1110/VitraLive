"use client";

import onFollow from "@/actions/follow";
import onUnFollow from "@/actions/unfollow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

function FollowButton({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const handleFollowClick = () => {
    startTransition(() => {
      onFollow({ id: userId })
        .then((data) => {
          toast.success(`You are now Following ${data?.following.username}`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  const handleUnFollowClick = () => {
    startTransition(() => {
      onUnFollow({ id: userId })
        .then((data) => {
          toast.success(`You are now unfollowing ${data?.following.username}`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  return (
    <div>
      <Button
        disabled={isPending}
        variant="secondary"
        onClick={isFollowing ? handleUnFollowClick : handleFollowClick}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
}

export default FollowButton;
