import { create } from "zustand";

interface AIState {
  isOpen: boolean;
  toggleOpen: () => void;
  isOutputOpen: boolean;
  output: string;
  isOutputLoading: boolean;
  setOutputLoading: (val: boolean) => void;
  openOutput: (text: string) => void;
  closeOutput: () => void;
  suggestedActions: Array<{ icon: JSX.Element; text: string }>;
  draftActions: Array<{ icon: JSX.Element; text: string; disabled?: boolean }>;
}

const useAIStore = create<AIState>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  isOutputOpen: false,
  output: "",
  isOutputLoading: false,
  setOutputLoading(val: boolean) {
    set({ isOutputLoading: val });
  },
  openOutput: (text: string) => set({ isOutputOpen: true, output: text }),
  closeOutput: () => set({ isOutputOpen: false }),
  suggestedActions: [],
  draftActions: [],
}));

export default useAIStore;
