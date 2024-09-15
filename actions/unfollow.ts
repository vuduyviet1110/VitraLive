"use server";

import GetSef from "@/lib/auth-service";
import { unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

interface Props {
  id: string;
}

async function onUnFollow({ id }: Props) {
  const currentUser = await GetSef();
  if (!currentUser) {
    throw new Error("Unauthorized ");
  } else {
    try {
      const unfollowResult = await unfollowUser(id);
      revalidatePath("/");
      if (unfollowResult) {
        revalidatePath(`/${unfollowResult.following.username}`);
        return unfollowResult;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

export default onUnFollow;
