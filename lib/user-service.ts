"use server";

import { db } from "./db";

export const getUserByUsername = (username: string) => {
  const MatchedUser = db.user.findUnique({
    where: { username },
    include: {
      stream: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  return MatchedUser;
};

export const getUserById = (userId: string) => {
  const MatchedUser = db.user.findUnique({
    where: { id: userId },
    include: {
      stream: true,
    },
  });
  return MatchedUser;
};
