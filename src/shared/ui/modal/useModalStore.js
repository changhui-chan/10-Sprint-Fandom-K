import { create } from 'zustand';

const useModalStore = create((set) => ({
  isVisible: false,
  modalContent: null,
  openModal: (content) => set({ isVisible: true, modalContent: content }),
  removeElement: () => set({ isVisible: false, modalContent: null }),
}));

export default useModalStore;
