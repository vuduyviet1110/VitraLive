"use server";
import { toast } from "sonner";
import GetSef from "./auth-service";
import { db } from "./db";

export const isFollowingUser = async (id: string) => {
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
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
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
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  if (existingFollow) {
    throw new Error("Already following");
  }
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
      updatedAt: new Date(),
    },
    include: {
      follower: true,
      following: true,
    },
  });
  return follow;
};
export const unfollowUser = async (id: string) => {
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
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  if (!existingFollow) {
    throw new Error("Not following");
  }
  if (existingFollow) {
    const follow = await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });
    return follow;
  }
};

export const getFollowedUsers = async () => {
  const currentUser = await GetSef();
  try {
    if (!currentUser) {
      return false;
    } else {
      return await db.follow.findMany({
        where: {
          followerId: currentUser.id,
        },
        include: {
          following: {
            include: {
              stream: {
                select: {
                  isLive: true,
                },
              },
            },
          },
        },
      });
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};
