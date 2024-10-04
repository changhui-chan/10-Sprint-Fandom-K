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
  contributeSupport: async (id, amount) => {
    set({ error: null });
    try {
      const { data } = await fetchData(
        `${URL_DONATIONS}${id}/contribute`,
        '',
        'PUT',
        { amount }
      );
      set((state) => ({
        supports: state.supports.map((support) =>
          support.id === id ? { ...support, ...data } : support
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useSupportStore;
