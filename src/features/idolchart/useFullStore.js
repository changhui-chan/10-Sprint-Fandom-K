import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_CHARTS } from '@/shared/constant/url';

const useFullIdolStore = create((set) => ({
  fullIdols: [],
  isLoading: false,
  error: null,

  fetchAllIdols: async (gender) => {
    set({ isLoading: true, error: null });

    const url = `${URL_CHARTS}gender`;
    const query = { gender, pageSize: 100 };

    try {
      const { data: fullIdolsData } = await fetchData(url, query);
      set({ fullIdols: fullIdolsData?.idols || [] });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFullIdolStore;
