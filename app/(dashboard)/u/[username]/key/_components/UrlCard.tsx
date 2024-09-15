import { Input } from "@/components/ui/input";
import { CopyCheckIcon } from "lucide-react";
import CopyBtn from "./copybtn";

interface UrlCardProps {
  value: string | null;
}

function UrlCard({ value }: UrlCardProps) {
  return (
    <div className=" flex items-center w-full justify-between rounded-xl bg-muted-foreground p-4 text-xl">
      <p className=" font-bold text-slate-100 tracking-wide mr-6">Server URL</p>
      <div className="flex-1 font-bold text-slate-100 tracking-wide ">
        <Input
          placeholder="Server URL"
          className="bg-slate-900 cursor-pointer border-none "
          value={value || " "}
          type="text"
          disabled
        />
      </div>

      <div className="ml-6">
        <CopyBtn value={value}></CopyBtn>
      </div>
    </div>
  );
}

export default UrlCard;
