"use server";

import GetSelf from "./auth-service";
import { db } from "./db";

export const getStreams = async () => {
  let userId;
  try {
    const self = await GetSelf();
    userId = self?.id;
  } catch (error) {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
            blockedBy: {
              some: {
                blockerId: userId,
              },
            },
          },
        },
        userId: {
          not: userId, // This line excludes your own stream
        },
      },
      include: {
        user: true,
      },
      orderBy: [{ isLive: "desc" }, { createdAt: "desc" }],
    });
  } else {
    streams = await db.stream.findMany({
      include: {
        user: true,
      },
      orderBy: [{ isLive: "desc" }, { createdAt: "desc" }],
    });
  }

  return streams;
};
