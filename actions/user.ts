"use server";

import GetSef from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUserBio = async (values: Partial<User>) => {
  try {
    const self = await GetSef();
    const validData = {
      bio: values.bio,
    };

    if (!self) {
      throw new Error("Unauthorized");
    }
    const user = await db.user.update({
      where: {
        id: self.id,
      },
      data: { ...validData },
    });

    revalidatePath("/u/" + self.username);
    revalidatePath("/" + self.username);
    return user;
  } catch (error) {
    caches;
  }
};
