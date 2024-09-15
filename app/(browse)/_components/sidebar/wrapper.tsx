"use client";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/store/useSidebar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { isCollapsed } = useSidebarStore();
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full border bg-[#252731] border-slate-700",
        isCollapsed && "w-[70px]"
      )}
    >
      <div>
        <div>{children}</div>
      </div>
    </aside>
  );
};

export default Wrapper;
