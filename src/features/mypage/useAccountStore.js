import { create } from 'zustand';
import fetchData from '../../shared/api/fetchData';
import { URL_IDOLS } from '../../shared/constant/url';

export const useAccountStore = create((set) => ({
  idolData: [],
  isLoding: false,
  error: null,
  fetchAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await fetchData(URL_IDOLS, { pageSize: 999 });
      const uniqueIdolData = data.list.filter(
        (item, index, self) => self.findIndex((t) => t.id === item.id) === index
      );
      set({ idolData: uniqueIdolData });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useSelectedIdolListStore = create((set) => ({
  selectedIdolList: [],
  tempIdolList: [],
  addIdol: (idols) =>
    set((state) => ({
      selectedIdolList: [...state.selectedIdolList, ...idols],
    })),
  removeIdol: (idol) =>
    set((state) => ({
      selectedIdolList: state.selectedIdolList.filter(
        (selectedIdol) => selectedIdol.id !== idol.id
      ),
    })),
  addTempIdol: (idol) =>
    set((state) => ({ tempIdolList: [...state.tempIdolList, idol] })),
  removeTempIdol: (idols) =>
    set((state) => ({
      tempIdolList: state.tempIdolList.filter((tempIdol) => {
        if (Array.isArray(idols)) {
          return !idols.includes(tempIdol);
        }
        return tempIdol.id !== idols.id;
      }),
    })),
}));

export const useIdolStateStore = create((set) => ({
  idolState: {},
  addIdolState: (idols) => {
    const idolState = idols.reduce((acc, idol) => {
      acc[idol.id] = false;
      return acc;
    }, {});
    set({ idolState });
  },
  toggleIdolState: (idol) =>
    set((state) => {
      return {
        idolState: {
          ...state.idolState,
          [idol.id]: !state.idolState[idol.id],
        },
      };
    }),
  resetIdolState: (idols) =>
    set((state) => {
      const idolState = { ...state.idolState };
      idols.forEach((idol) => {
        idolState[idol.id] = false;
      });
      return { idolState };
    }),
}));
