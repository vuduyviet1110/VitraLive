"use server";

import getRecomenedUser from "@/lib/recommend-service";
import RecomendedUser from "./recomemded";
import ToggleSidebar from "./toggleSidebar";
import Wrapper from "./wrapper";
import { RecomendedSkeleton } from "./recomemded";
import { getFollowedUsers } from "@/lib/follow-service";
import FollowingUser from "./following";
async function SideBar() {
  const allUsers = await getRecomenedUser();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <ToggleSidebar />
      <RecomendedUser data={allUsers || []} />
      {following && <FollowingUser data={following} />}
    </Wrapper>
  );
}

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border bg-[#252731] border-slate-700 ">
      <RecomendedSkeleton />
    </aside>
  );
};

export default SideBar;
