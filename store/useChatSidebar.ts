import { create } from "zustand";

export enum ChatVariant {
  Chat = "chat",
  Community = "community",
}
interface ChatSideBar {
  collapsed: boolean;
  variant: ChatVariant;
  onChangeVariant: (variant: ChatVariant) => void;
  onCollapse: () => void;
  onExpand: () => void;
}

const useChatSideBar = create<ChatSideBar>((set) => ({
  collapsed: false,
  variant: ChatVariant.Chat,
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
  onCollapse: () => set({ collapsed: true }),
  onExpand: () => set({ collapsed: false }),
}));

export default useChatSideBar;
