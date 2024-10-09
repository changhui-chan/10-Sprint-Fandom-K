import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_IDOLS } from '@/shared/constant/url';

const useFormStore = create((set) => ({
  idols: [],
  newId: 0,
  isLoading: false,
  error: null,

  fetchIdols: async () => {
    set({ isLoading: true, error: null });

    try {
      const { data: AllIdolData } = await fetchData(URL_IDOLS, {
        pageSize: 1000,
      });
      set({ idols: AllIdolData?.list || [] });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFormStore;
