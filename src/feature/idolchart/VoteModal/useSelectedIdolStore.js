import { create } from 'zustand';

const useSelectedIdolStore = create((set) => ({
  selectedIdolId: null,
  setSelectedIdolId: (id) =>
    set((state) => ({
      selectedIdolId: state.selectedIdolId === id ? null : id,
    })),
}));

export default useSelectedIdolStore;
