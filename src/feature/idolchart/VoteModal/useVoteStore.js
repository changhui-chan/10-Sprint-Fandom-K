import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_VOTE } from '@/shared/constant/url';

const useVoteStore = create((set) => ({
  isLoading: false,
  error: null,

  contributeVote: async (idolId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await fetchData(`${URL_VOTE}`, '', 'POST', { idolId });

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
}));

export default useVoteStore;
