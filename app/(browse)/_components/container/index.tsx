"use client";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/store/useSidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

function Container({ children }: { children: React.ReactNode }) {
  const { isCollapsed, onCollapse, onExpand } = useSidebarStore();
  const responsiveMatched = useMediaQuery("(max-width:1024px)");
  useEffect(() => {
    if (responsiveMatched) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [responsiveMatched, onCollapse, onExpand]);
  return (
    <div className={cn("w-full", isCollapsed ? "ml-[70px]" : "ml-60")}>
      {children}
    </div>
  );
}

export default Container;
