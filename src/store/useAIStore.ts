import { create } from "zustand";

interface AIState {
  isOpen: boolean;
  toggleOpen: () => void;
  suggestedActions: Array<{ icon: JSX.Element; text: string }>;
  draftActions: Array<{ icon: JSX.Element; text: string; disabled?: boolean }>;
}

const useAIStore = create<AIState>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  suggestedActions: [],
  draftActions: [],
}));

export default useAIStore;
