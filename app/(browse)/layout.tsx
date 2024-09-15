import { Suspense } from "react";
import Navbar from "./_components/navbar";
import SideBar, { SideBarSkeleton } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        {children}
      </div>
    </div>
  );
};

export default BrowseLayout;
