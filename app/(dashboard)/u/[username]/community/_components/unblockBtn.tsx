"use client";

import onUnBlock from "@/actions/unblock";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  id: string;
}

export default function UnblockBtn({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  const onHandleClick = () => {
    startTransition(() => {
      onUnBlock({ id })
        .then((result) => {
          toast.success(
            "User:" + result?.Blocked.username + " has been unblocked"
          );
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onHandleClick}
      size={"sm"}
      className="bg-slate-700  hover:text-blue-500 border-none"
    >
      Unblock
    </Button>
  );
}
