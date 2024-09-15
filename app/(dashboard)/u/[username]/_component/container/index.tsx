"use client";
import { cn } from "@/lib/utils";
import useCreatorSidebarStore from "@/store/useCreatorSideBar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

function Container({ children }: { children: React.ReactNode }) {
  const { isCollapsed, onCollapse, onExpand } = useCreatorSidebarStore();
  const responsiveMatched = useMediaQuery("(max-width:1024px)");
  useEffect(() => {
    if (responsiveMatched) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [responsiveMatched, onCollapse, onExpand]);
  return (
    <div
      className={cn(
        " mt-20 ",
        isCollapsed
          ? "ml-[70px] w-[calc(100vw-85px)]"
          : "w-[calc(100vw-16rem)] ml-60"
      )}
    >
      {children}
    </div>
  );
}

export default Container;
