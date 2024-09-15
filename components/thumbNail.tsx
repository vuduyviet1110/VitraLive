import Image from "next/image";
import LiveBadge from "./live-badge";
import UserAvatar from "./user-avatar";

interface ThumbNailProps {
  isLive: boolean;
  username: string;
  thumbNailSrc: string | null;
  fallback: string;
}

export const ThumbNail = ({
  isLive,
  username,
  thumbNailSrc,
  fallback,
}: ThumbNailProps) => {
  let content;
  if (!thumbNailSrc) {
    content = (
      <div className="flex flex-col ease-in-out duration-500 items-center opacity-80 justify-center w-full h-full group-hover:translate-x-2 bg-slate-700 group-hover:-translate-y-1 rounded-md">
        <UserAvatar
          size="lg"
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center w-full h-full group-hover:translate-x-2 ease-in-out duration-500 bg-slate-700  group-hover:-translate-y-2 rounded-md">
        <div className="relative bg-black w-full h-full opacity-70  ">
          <img
            alt=" "
            src={thumbNailSrc}
            className="w-full h-full object-cover opacity-100 rounded-md "
          />
          {isLive && (
            <div className="z-50">
              <LiveBadge className="absolute top-0 translate-x-2 bottom-36  " />

              <div className="absolute  w-8 flex space-x-1 -translate-y-4  top-1/2 left-1/2 h-8">
                <div className=" w-[2px] bg-rose-500 h-full animate-candle-stretch" />
                <div className=" w-[2px] bg-rose-500 h-full animate-candle-stretch" />
                <div className=" w-[2px] bg-rose-500 h-full animate-candle-stretch" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="group bg-slate-500  aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 opacity-0.5 group-hover:opacity-100  transition-opacity">
        {content}
      </div>
    </div>
  );
};
