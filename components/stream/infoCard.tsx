"use client";

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import InfoMadal from "./infoMadal";
import Image from "next/image";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
  description: string | null;
}
const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
  description,
}: InfoCardProps) => {
  const hostAsviewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsviewer;

  if (!isHost) return null;

  return (
    <div className="px-4 mx-4 bg-muted rounded-xl ">
      <div className="flex items-center justify-between  ">
        <div className="flex justify-between w-full h-full  p-4">
          <div className="flex flex-col">
            <h2 className="text-sm lg:text-lg font-semibold  capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Max ur visibility
            </p>
          </div>
          <div className="rounded-md  bg-muted-foreground ease-in-out duration-500 cursor-pointer h-full">
            <InfoMadal
              initialName={name}
              initialThumbnailUrl={thumbnailUrl}
              initialDescription={description}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="my-3 space-y-4">
          <div>
            <div className="text-sm lg:text-lg text-slate-500  font-semibold capitalize">
              Name
            </div>
            <p className="text-black text-xs font-bold lg:text-sm mt-1">
              {name}
            </p>
          </div>
          <div>
            <div className="text-sm lg:text-lg text-slate-500  font-semibold capitalize">
              Description
            </div>
            {description ? (
              <p className="text-black text-xs font-bold lg:text-sm mt-1">
                {description}
              </p>
            ) : (
              <div className="text-xs font-bold lg:text-sm mt-1 italic">
                {" "}
                (No description yet)
              </div>
            )}
          </div>
          <h3 className="text-sm lg:text-lg text-slate-500   font-semibold capitalize">
            Thumbnail
          </h3>
          {thumbnailUrl ? (
            <div className="relative aspect-video rounded-md overflow-hidden  w-[250px] border  border-slate-600">
              <Image
                fill
                src={thumbnailUrl}
                alt={name}
                className="object-cover"
              />
            </div>
          ) : (
            <Image
              fill
              src={""}
              alt={name}
              className="w-20 h-20 rounded-xl text-black"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
