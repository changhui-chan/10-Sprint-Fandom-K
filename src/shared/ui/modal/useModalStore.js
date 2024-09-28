import { create } from 'zustand';

const useModalStore = create((set) => ({
  isVisible: true,
  removeElement: () => set({ isVisible: false }),
}));

export default useModalStore;
