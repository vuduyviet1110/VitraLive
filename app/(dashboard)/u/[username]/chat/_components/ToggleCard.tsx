"use client";

import { updateStream } from "@/actions/stream";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldType = "isEnabledChat" | "isDelayChat" | "isOnlyFollowerOnly";

interface Props {
  label: string;
  IsTurningOn: boolean;
  field: FieldType;
}

function ToggleCard({ label, IsTurningOn = false, field }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    startTransition(() => {
      updateStream({
        [field]: !IsTurningOn,
      })
        .then(() => {
          toast.success(
            `chat settings updated! Satus: ${IsTurningOn ? "Off" : "On"}`
          );
        })
        .catch(() => toast.error("Some thing went wrong"));
    });
  };
  return (
    <div className="rounded bg-slate-700 w-[80%] text-slate-100 p-2 mt-6">
      <div className="flex items-center justify-between  p-2 space-x-2 ">
        <Label htmlFor="airplane-mode" className="font-semibold">
          {label}
        </Label>
        <Switch
          disabled={isPending}
          onClick={handleToggle}
          checked={IsTurningOn}
          id="airplane-mode"
        >
          {IsTurningOn ? "On" : "Off"}
        </Switch>
      </div>
    </div>
  );
}

export default ToggleCard;
