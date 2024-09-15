import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
}
const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        " text-center bottom-0 translate-x-1  translate-y-1/2 left-0  bg-rose-500 text-white px-1  tracking-wide font-semibold border text-[11px] border-background ",
        className
      )}
    >
      Live
    </div>
  );
};

export default LiveBadge;
