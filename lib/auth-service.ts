"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

async function GetSef() {
  const self = await currentUser();
  if (!self) {
    return;
  }
  const matchedUser = db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!matchedUser) {
    throw new Error("User not found");
  }
  return matchedUser;
}

export default GetSef;

export const getSelfByUserName = async (username: string) => {
  const self = await currentUser();

  if (!self) {
    return false;
  }

  const matchedUser = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!matchedUser) {
    throw new Error("User not found");
  }

  if (matchedUser && self.username !== matchedUser.username) {
    throw new Error("Unauthorized");
  }
  return matchedUser;
};
