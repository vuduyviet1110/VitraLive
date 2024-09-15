"use server";

import GetSef from "@/lib/auth-service";
import { BlockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await GetSef();
  if (!self) {
    throw new Error("Unauthorized");
  }
  const blockedUser = await BlockUser(id);
  try {
    await roomService.removeParticipant(self?.id, id);
  } catch (error) {
    // user not in the room
  }
  revalidatePath(`/u/${self.username}/community`);
  if (blockedUser) {
    revalidatePath(`/${blockedUser.Blocked.username}`);
  }
  return blockedUser;
};
