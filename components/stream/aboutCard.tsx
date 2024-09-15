import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bioModal";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel =
    followedByCount === 1 || followedByCount === 0 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-muted p-6 lg:p-10 flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg lg:text-xl font-semibold">
            <span className="text-slate-500">About</span>{" "}
            <span className="text-black">{hostName}</span>
            <VerifiedMark />
          </div>
          {isHost && (
            <div className="flex items-center gap-x-2 text-lg lg:text-2xl font-semibold">
              <BioModal intialValue={bio} />
            </div>
          )}
        </div>
        <div className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">
            {followedByCount}{" "}
          </span>
          {followedByLabel}
          {bio?.trim() ? (
            <p className="italic   text-sm mt-2">{bio}</p>
          ) : (
            <p className="italic text-sm mt-2">So Si cờ rịt User</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
