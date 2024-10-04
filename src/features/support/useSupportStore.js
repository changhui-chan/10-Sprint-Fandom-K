import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_DONATIONS } from '@/shared/constant/url';

const useSupportStore = create((set) => ({
  supports: [],
  isLoading: false,
  error: null,
  fetchSupports: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await fetchData(URL_DONATIONS);
      set({ supports: data.list });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSupportStore;
