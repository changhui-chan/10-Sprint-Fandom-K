import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_CHARTS } from '@/shared/constant/url';

const useIdolStore = create((set) => ({
  idols: [],
  topIdol: null,
  isLoading: false,
  error: null,
  pageSize: 10,

  fetchIdols: async (gender, pageSize) => {
    set({ isLoading: true, error: null });

    const url = `${URL_CHARTS}gender`;
    const query = { gender, pageSize };

    try {
      const { data: idolListData } = await fetchData(url, query);
      const { data: topIdolData } = await fetchData(url, {
        gender,
        pageSize: 1,
      });

      set({ idols: idolListData?.idols || [] });
      set({ topIdol: topIdolData?.idols[0] || null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setPageSize: (newSize) => set({ pageSize: newSize }),
}));

export default useIdolStore;
