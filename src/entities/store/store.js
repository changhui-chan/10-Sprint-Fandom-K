import { create } from 'zustand';

export const useStore = create((set) => ({}));
export const useChargeModalVisibilityStore = create((set) => ({
  isChargeModalVisible: false,
  setChargeModalVisibility: (isVisible) =>
    set({ isChargeModalVisible: isVisible }),
}));

export default useStore;
