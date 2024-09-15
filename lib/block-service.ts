"use server";

import { toast } from "sonner";
import GetSef from "./auth-service";
import { db } from "./db";

export const CurrentUserisBlockedBy = async (id: string) => {
  try {
    const self = await GetSef();
    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }
    if (!self) {
      throw new Error("Unauthorized");
    }
    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockedId: self.id,
        blockerId: otherUser.id,
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const BlockUser = async (id: string) => {
  const self = await GetSef();
  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!self) {
    return false;
  }
  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot block yourself");
  }

  const existingblock = await db.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });
  if (existingblock) {
    throw new Error("Already blocking");
  }
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      Blocked: true,
    },
  });
  return block;
};
export const unblockUser = async (id: string) => {
  const self = await GetSef();
  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!self) {
    return false;
  }
  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot block yourself");
  }

  const existingBlock = await db.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });
  if (!existingBlock) {
    throw new Error("Not Blocking");
  }
  if (existingBlock) {
    const block = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        Blocked: true,
      },
    });
    return block;
  }
};

export const getFollowedUsers = async () => {
  const currentUser = await GetSef();
  try {
    if (!currentUser) {
      throw new Error("Unauthorized");
    } else {
      return await db.block.findMany({
        where: {
          blockerId: currentUser.id,
        },
        include: {
          Blocker: true,
        },
      });
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const getBlockedUsers = async () => {
  const self = await GetSef();
  if (!self) {
    throw new Error("Unauthorized");
  }

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      Blocked: true,
    },
  });
  return blockedUsers;
};
