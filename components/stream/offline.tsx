import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import Link from "next/link";
import { ArrowBigRightDash, LucideWifiOff } from "lucide-react";

const OfflineStream = ({ hostname }: { hostname: string }) => {
  return (
    <div className="flex justify-center items-center z-0 bg-transparent">
      <div className=" flex justify-center items-center flex-col mt-8 p-8 rounded-lg shadow-lg text-center max-w-lg w-[80%]">
        <h1 className="text-3xl font-bold text-slate-300">
          Host:{" "}
          <span className="text-destructive tracking-wide">{hostname}</span>
        </h1>
        <h2 className="text-lg font-semibold text-slate-200 mt-4">
          The stream is currently offline.
        </h2>
        <div className="text-slate-200 w-full mt-8 flex justify-between space-x-2">
          <div className="flex items-center space-x-1">
            <Label htmlFor="online" className="font-semibold mr-1">
              Notify when host online
            </Label>
            <Switch id="online" />
          </div>
          <Link
            href={"/message"}
            className="hover:translate-x-1 flex  transition-all ease-in-out duration-150 gap-2 items-center"
          >
            Message with host
            <ArrowBigRightDash className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-8 h-[50px] w-[50px]">
          <LucideWifiOff className="w-full text-slate-100 h-full" />
        </div>
      </div>
    </div>
  );
};

export default OfflineStream;
