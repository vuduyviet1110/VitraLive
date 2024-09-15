import { ThumbNail } from "@/components/thumbNail";
import UserAvatar from "@/components/user-avatar";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface StreamListProps {
  stream: Stream & { user: User };
}
function StreamList({ stream }: StreamListProps) {
  return (
    <div key={stream.id}>
      <Link href={`/${stream.user.username}`}>
        <div className=" relative w-full h-full space-y-4">
          <ThumbNail
            isLive={stream.isLive}
            username={stream.user.username}
            thumbNailSrc={stream.thumnailUrl}
            fallback={stream.user.imageUrl}
          />
          <div className="flex gap-3">
            <UserAvatar
              username={stream.user.username}
              imageUrl={stream.user.imageUrl}
              isLive={stream.isLive}
            />
            <div>
              <p className="text-sm font-semibold truncate">
                {stream.description ? stream.description : "(description)"}
              </p>
              <p className="text-sm font-medium truncate">{stream.name}</p>
              <p className="text-sm font-light italic truncate">
                {stream.user.username}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default StreamList;
