import { create } from "zustand";
// ejemplo sencillo del uso de zustand
type Store = {
  count: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
};

const initialState = {
  count: 100,
};

export const useCounterStore = create<Store>()((set) => ({
  ...initialState,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(initialState),
}));
