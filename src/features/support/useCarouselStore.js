import { create } from 'zustand';

const useCarouselStore = create((set) => ({
  currentIndex: 0,
  slidesToShow: 4,
  translateX: 0,
  startX: 0,
  initialPosition: 0,
  isDragging: false,
  itemWidth: 300,
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setSlidesToShow: (value) => set({ slidesToShow: value }),
  setTranslateX: (value) => set({ translateX: value }),
  setStartX: (value) => set({ startX: value }),
  setInitialPosition: (value) => set({ initialPosition: value }),
  setIsDragging: (value) => set({ isDragging: value }),
  setItemWidth: (width) => set({ itemWidth: width }),
}));

export default useCarouselStore;
