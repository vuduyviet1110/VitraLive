"use client";
import { Input } from "@/components/ui/input";
import CopyBtn from "./copybtn";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function KeyCard({ value }: { value: string | null }) {
  const [isShowKey, setIshowKey] = useState(false);
  return (
    <div>
      <div className=" flex w-full justify-between rounded-xl bg-muted-foreground p-4 mt-4 text-xl">
        <p className=" font-bold items-start text-slate-100 tracking-wide mr-6">
          Stream Key
        </p>
        <div className="flex-1 flex-col font-bold text-slate-100 tracking-wide ">
          <Input
            className="bg-slate-900 cursor-pointer border-none "
            value={value || ""}
            type={isShowKey ? "text" : "password"}
            disabled
            placeholder="Stream Key"
          />
          <Button className="mt-4" onClick={() => setIshowKey(!isShowKey)}>
            {isShowKey ? "Hide" : "Show"}
          </Button>
        </div>
        <div className="ml-6">
          <CopyBtn value={value}></CopyBtn>
        </div>
      </div>
    </div>
  );
}

export default KeyCard;
