"use server";

import GetSef from "@/lib/auth-service";
import { db } from "@/lib/db";
import { followUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

interface Props {
  id: string;
}

async function onFollow({ id }: Props) {
  const currentUser = await GetSef();
  if (!currentUser) {
    throw new Error("Unauthorized ");
  } else {
    try {
      const followResult = await followUser(id);
      revalidatePath("/");
      if (followResult) {
        revalidatePath(`/${followResult.following.username}`);
        return followResult;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

export default onFollow;
