import { create } from 'zustand';
import fetchData from '@/shared/api/fetchData';
import { URL_IDOLS, URL_DONATIONS } from '@/shared/constant/url';

const useFormStore = create((set) => ({
  idols: [],
  newId: 0,
  isLoading: false,
  isPosting: false,
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

  postSupport: async (result) => {
    set({ isPosting: true, error: null });

    const url = URL_DONATIONS;
    const method = 'POST';
    const body = result;

    try {
      const { data: response } = await fetchData(url, {}, method, body);
      // console.log('post의 리스폰스: ', response);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isPosting: false });
    }
  },

  getIdolId: async (group, member) => {
    set({ isLoading: true, error: null });

    const name = member;
    const url = URL_IDOLS;
    const query = {
      keyword: `${name}`,
    };

    try {
      const { data: selectedIdol } = await fetchData(url, query);
      // console.log('selected data: ', selectedIdol);
      set({ newId: selectedIdol?.list[0].id || 0 });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFormStore;
