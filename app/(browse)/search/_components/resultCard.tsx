import { ThumbNail } from "@/components/thumbNail";
import { VerifiedMark } from "@/components/verified-mark";
import { Stream, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardProps {
  data: {
    id: string;
    name: string;
    thumnailUrl: string | null;
    updatedAt: Date;
    isLive: boolean;
    user: User;
  };
}

function ResultCard({ data }: ResultCardProps) {
  return (
    <Link href={`/streams/${data.user.username}`}>
      <div className="gap-2">
        <div className="relative  h-[9rem] w-[16rem]">
          <ThumbNail
            isLive={data.isLive}
            username={data.user.username}
            thumbNailSrc={data.thumnailUrl}
            fallback={data.user.imageUrl}
          />
        </div>
        <div className="space-y-1 text-slate-300">
          <div className="flex items-center gap-x-2">
            <p className="text-lg  font-semibold truncate hover:text-blue-500">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm font-medium truncate ">{data.name}</p>
          <p className="text-sm font-light truncate ">
            {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ResultCard;
