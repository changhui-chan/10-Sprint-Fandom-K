import { create } from 'zustand';

export const useStore = create((set) => ({}));
export const useChargeModalVisibilityStore = create((set) => ({
  isChargeModalVisible: false,
  setChargeModalVisibility: (isVisible) =>
    set({ isChargeModalVisible: isVisible }),
}));

export const useCreditStore = create((set) => ({
  credit: Number(localStorage.getItem('credit')) ?? 0,
  resetCredit: () =>
    set(() => {
      localStorage.setItem('credit', 0);
      return { credit: 0 };
    }),
  addCredit: (amount) =>
    set((state) => {
      const nextCredit = state.credit + amount;
      localStorage.setItem('credit', nextCredit);
      return { credit: nextCredit };
    }),
  payCredit: (amount) =>
    set((state) => {
      const nextCredit = Math.max(0, state.credit - amount);
      localStorage.setItem('credit', nextCredit);
      return { credit: nextCredit };
    }),
}));

export default useStore;
