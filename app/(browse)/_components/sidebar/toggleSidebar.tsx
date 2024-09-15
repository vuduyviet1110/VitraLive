"use client";
import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/store/useSidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

function ToggleSidebar() {
  const { onCollapse, isCollapsed, onExpand } = useSidebarStore();
  const label = isCollapsed ? "Expand" : "Collapse";
  return (
    <div
      className={cn(
        "flex m-3 justify-between ",
        isCollapsed && "justify-center"
      )}
    >
      {!isCollapsed && <div>Streamming</div>}

      {isCollapsed && (
        <Hint label={label} side="right" align="center" asChild>
          <div>
            <button onClick={() => onExpand()}>
              <ArrowRightFromLine />
            </button>
          </div>
        </Hint>
      )}
      {!isCollapsed && (
        <Hint label={label} side="right" align="center" asChild>
          <div>
            <button onClick={() => onCollapse()}>
              <ArrowLeftFromLine />
            </button>
          </div>
        </Hint>
      )}
    </div>
  );
}

export default ToggleSidebar;
