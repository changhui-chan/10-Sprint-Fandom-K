import { create } from 'zustand';

const useModalStore = create((set) => ({
  modals: {},
  openModal: (id, content) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isVisible: true, content } },
    })),
  closeModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isVisible: false, content: null } },
    })),
}));

export default useModalStore;
