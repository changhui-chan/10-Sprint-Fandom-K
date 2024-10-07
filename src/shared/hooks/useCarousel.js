import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

const useCarousel = (
  itemsLength,
  initialSlidesToShow = 4,
  initialItemWidth = 300
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(initialSlidesToShow);
  const [translateX, setTranslateX] = useState(0);
  const [itemWidth, setItemWidth] = useState(initialItemWidth);

  const carouselRef = useRef(null);
  const startXRef = useRef(0);
  const initialPositionRef = useRef(0);
  const isDraggingRef = useRef(false);

  const maxIndex = useMemo(
    () => itemsLength - slidesToShow,
    [itemsLength, slidesToShow]
  );

  const caculateTranslateX = useCallback(
    (index) => -index * itemWidth,
    [itemWidth]
  );

  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const nextItemWidth = screenWidth < 768 ? 160 : 300;
    setItemWidth(nextItemWidth);

    const visibleSlides = Math.round(
      carouselRef.current
        ? carouselRef.current.parentElement.clientWidth / nextItemWidth
        : initialSlidesToShow
    );
    setSlidesToShow(visibleSlides);
    setTranslateX(caculateTranslateX(currentIndex));
  }, [currentIndex, caculateTranslateX, initialSlidesToShow]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleStart = (clientX) => {
    startXRef.current = clientX;
    initialPositionRef.current = translateX;
    carouselRef.current.style.transition = 'none';
    isDraggingRef.current = true;
  };

  const handleMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const movement = clientX - startXRef.current;
    const newTranslateX = initialPositionRef.current + movement;

    setTranslateX(newTranslateX);
    carouselRef.current.style.transform = `translateX(${newTranslateX}px)`;
  };

  const handleEnd = (clientX) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    carouselRef.current.style.transition = 'transform 0.3s ease-in-out';

    const maxTranslateX = -(
      carouselRef.current.scrollWidth -
      carouselRef.current.parentElement.clientWidth
    );
    const movement = clientX - startXRef.current;
    const threshold = itemWidth / 4;

    if (translateX > 0) {
      setCurrentIndex(0);
      setTranslateX(0);
    } else if (translateX - threshold < maxTranslateX) {
      setCurrentIndex(maxIndex);
      setTranslateX(maxTranslateX);
    } else if (movement < -threshold && currentIndex <= maxIndex) {
      setCurrentIndex(currentIndex + 1);
      setTranslateX(caculateTranslateX(currentIndex + 1));
    } else if (movement > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTranslateX(caculateTranslateX(currentIndex - 1));
    } else {
      setTranslateX(caculateTranslateX(currentIndex));
    }

    carouselRef.current.style.transform = `translateX(${translateX}px)`;
  };

  const handleTouchStart = (e) =>
    handleStart(e.clientX || e.touches?.[0].clientX);
  const handleTouchMove = (e) =>
    handleMove(e.clientX || e.touches?.[0].clientX);
  const handleTouchEnd = (e) =>
    handleEnd(e.clientX || e.changedTouches?.[0].clientX);

  return {
    currentIndex,
    maxIndex,
    translateX,
    carouselRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleButton: setCurrentIndex,
  };
};

export default useCarousel;
