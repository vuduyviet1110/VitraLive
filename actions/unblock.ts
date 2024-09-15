"use server";

import GetSef from "@/lib/auth-service";
import { unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

interface Props {
  id: string;
}

async function onUnBlock({ id }: Props) {
  const currentUser = await GetSef();
  if (!currentUser) {
    throw new Error("Unauthorized ");
  } else {
    try {
      const unBlockResult = await unblockUser(id);
      if (unBlockResult) {
        revalidatePath(`/u/${unBlockResult.Blocked.username}/community `);
        return unBlockResult;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

export default onUnBlock;
