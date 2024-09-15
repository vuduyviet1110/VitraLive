"use server";
import GetSef from "./auth-service";
import { db } from "./db";

async function getRecomenedUser() {
  const self = await GetSef();
  if (!self) {
    return db.user.findMany({
      include: {
        stream: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (self) {
    const users = await db.user.findMany({
      where: {
        id: { not: self.id },
        followedBy: { none: { followerId: self.id } },
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  }
}

export default getRecomenedUser;
