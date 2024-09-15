"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import onFollow from "@/actions/follow";
import { toast } from "sonner";
import onUnFollow from "@/actions/unfollow";

interface ActionProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({ hostIdentity, isFollowing, isHost }: ActionProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const toggleFollow = () => {
    if (!userId) return router.push("/sign-in");

    if (isHost) return;

    if (!isFollowing) {
      startTransition(() => {
        onFollow({ id: hostIdentity })
          .then((data) => {
            toast.success(`You are now following ${data?.following.username}!`);
          })
          .catch((error) => {
            toast.error("Can not follow: something went wrong");
          });
      });
    } else if (isFollowing) {
      startTransition(() => {
        onUnFollow({ id: hostIdentity })
          .then((data) => {
            toast.success(
              `You are now unfollowing ${data?.following.username}!`
            );
          })
          .catch((error) => {
            toast.error(" Can not unfollow: something went wrong");
          });
      });
    }
  };

  return (
    <Button
      onClick={() => toggleFollow()}
      variant="secondary"
      size="sm"
      disabled={isHost || isPending}
      className=" lg:w=auto mt-4 max-w-fit"
    >
      <Heart
        className={cn(
          "h-4,w-4 mr-2 hidden lg:block",
          isFollowing
            ? "fill-rose-500 stroke-rose-500 "
            : "fill-transparent stroke-rose-00"
        )}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
