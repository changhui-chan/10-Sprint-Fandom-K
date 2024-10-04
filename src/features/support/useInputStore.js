import { create } from 'zustand';

const useInputStore = create((set) => ({
  inputValue: '',
  errorMessage: '',
  setInputValue: (value, credit) => {
    set({ inputValue: value });
    if (value.trim() === '') return set({ errorMessage: '' });
    if (value > credit)
      return set({
        errorMessage: '갖고 있는 크레딧보다 더 많이 후원할 수 없어요',
      });
    return set({ errorMessage: '' });
  },
  setErrorMessage: (error) => set({ errorMessage: error }),
  resetInputValue: () => set({ inputValue: '', errorMessage: '' }),
}));

export default useInputStore;
