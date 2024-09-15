"use server";

import { v4 } from "uuid";
import GetSef from "@/lib/auth-service";
import { CurrentUserisBlockedBy } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";

export default async function createViewerToken(hostIdentity: string) {
  let currentWatchingUser: { id: string; username: string };

  try {
    const user = await GetSef();
    if (!user || !user.id || !user.username) {
      throw new Error("Invalid user data");
    }
    currentWatchingUser = { id: user.id, username: user.username };
  } catch (error) {
    console.error("Error getting current user:", error);
    currentWatchingUser = {
      id: v4(),
      username: `guest#${Math.floor(Math.random() * 10000)}`,
    };
  }

  const host = await getUserById(hostIdentity);
  if (!host) {
    throw new Error(`Host not found`);
  }

  const isBlockedByHost = await CurrentUserisBlockedBy(hostIdentity);
  const isWatchingOwnLive = currentWatchingUser.id === host.id;

  if (isBlockedByHost) {
    throw new Error("You are blocked by the host");
  }

  console.log("Người đang xem: ", currentWatchingUser.username);

  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
    throw new Error("LiveKit API key or secret is not set");
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isWatchingOwnLive
        ? `host-${currentWatchingUser.id}`
        : currentWatchingUser.id,
      name: currentWatchingUser.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return token.toJwt();
}
