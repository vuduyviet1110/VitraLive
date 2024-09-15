import { create } from "zustand";

interface SidebarStore {
  CollapsedNum: number;
  isCollapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}
const useSidebarStore = create<SidebarStore>((set) => ({
  CollapsedNum: 0,
  isCollapsed: false,
  onExpand: () =>
    set((state) => ({
      CollapsedNum: state.CollapsedNum + 19,
      isCollapsed: false,
    })),
  onCollapse: () =>
    set(() => ({
      isCollapsed: true,
    })),
}));
export default useSidebarStore;
