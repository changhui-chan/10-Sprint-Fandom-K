import { create } from 'zustand';

const useSubmitStore = create((set) => ({
  isSubmitting: false,
  setIsSubmitting: (state) => set({ isSubmitting: state }),
}));

export default useSubmitStore;
