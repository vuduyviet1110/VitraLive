"use server";

import GetSef from "@/lib/auth-service";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (value: Partial<Stream>) => {
  try {
    const self = await GetSef();
    if (!self) return false;
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (selfStream) {
      await db.stream.update({
        where: {
          id: selfStream.id,
        },
        data: {
          name: value.name,
          isEnabledChat: value.isEnabledChat,
          isDelayChat: value.isDelayChat,
          description: value.description,
          isOnlyFollowerOnly: value.isOnlyFollowerOnly,
          thumnailUrl: value.thumnailUrl,
        },
      });
    }

    revalidatePath("/");
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
  } catch (error) {
    throw new Error("Error");
  }
};
