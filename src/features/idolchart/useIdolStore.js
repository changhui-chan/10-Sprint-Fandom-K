import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_CHARTS } from '@/shared/constant/url';

const useIdolStore = create((set) => ({
  idols: [],
  isLoading: false,
  error: null,
  pageSize: 10,

  fetchIdols: async (gender, pageSize) => {
    set({ isLoading: true, error: null });

    const url = `${URL_CHARTS}gender`;
    const query = { gender, pageSize };

    try {
      const { data: idolListData } = await fetchData(url, query);
      set({ idols: idolListData?.idols || [] });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setPageSize: (newSize) => set({ pageSize: newSize }),
}));

export default useIdolStore;
