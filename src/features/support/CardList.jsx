import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Card from '@/shared/ui/Card';
import useModalStore from '@/shared/ui/modal/useModalStore';
import leftIcon from '@/assets/images/btn-pagination-left.svg';
import rightIcon from '@/assets/images/btn-pagination-right.svg';
import caculateProgress from '@/shared/utils/caculateProgress';
import { formatDate, getRamainingDays } from '@/shared/utils/formatDate';
import styles from './CardList.module.scss';

const CardList = ({ supports, type = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [translateX, setTranslateX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [initialPosition, setInitialPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [itemWidth, setItemWidth] = useState(300);
  const carouselRef = useRef(null);

  const { openModal } = useModalStore();

  const maxIndex = useMemo(() => {
    return supports.length - slidesToShow;
  }, [supports.length, slidesToShow]);

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
        ? carouselRef.current.parentElement.clientWidth / itemWidth
        : 4
    );
    setSlidesToShow(visibleSlides);
    setTranslateX(caculateTranslateX(currentIndex));
  }, [
    currentIndex,
    setTranslateX,
    caculateTranslateX,
    setItemWidth,
    itemWidth,
    setSlidesToShow,
  ]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleStart = (clientX) => {
    setStartX(clientX);
    setInitialPosition(translateX);
    carouselRef.current.style.transition = 'none';
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const movement = clientX - startX;
    const newTranslateX = initialPosition + movement;

    setTranslateX(newTranslateX);
    carouselRef.current.style.transform = `translateX(${newTranslateX}px)`;
  };

  const handleEnd = (clientX) => {
    if (!isDragging) return;
    setIsDragging(false);
    carouselRef.current.style.transition = 'transform 0.3s ease-in-out';

    const maxTranslateX = -(
      carouselRef.current.scrollWidth -
      carouselRef.current.parentElement.clientWidth
    );
    const movement = clientX - startX;
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

  const handleButton = (index) => {
    setCurrentIndex(index);
    setTranslateX(caculateTranslateX(index));
  };

  const handleButtonClick = (id, image, title, subtitle) => {
    openModal({ id, image, title, subtitle });
  };

  const handleTouchStart = (e) =>
    handleStart(e.clientX || e.touches?.[0].clientX);
  const handleTouchMove = (e) =>
    handleMove(e.clientX || e.touches?.[0].clientX);
  const handleTouchEnd = (e) =>
    handleEnd(e.clientX || e.changedTouches?.[0].clientX);

  return supports.length ? (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={() => handleButton(currentIndex - 1)}
        disabled={currentIndex === 0}
      >
        <img src={leftIcon} alt="이전 슬라이드" />
      </button>
      <div className={styles.container}>
        <ul
          className={styles.cardList}
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={isDragging ? handleTouchMove : null}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          role="listbox"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {supports.map(
            ({
              id,
              idol,
              title,
              subtitle,
              receivedDonations,
              targetDonation,
              deadline,
            }) => {
              return (
                <li key={id} className={styles.card}>
                  <Card
                    idolImg={idol.profilePicture}
                    title={title}
                    subtitle={subtitle}
                    target={targetDonation.toLocaleString()}
                    deadline={formatDate(deadline)}
                    progress={caculateProgress(
                      receivedDonations,
                      targetDonation
                    )}
                    onButtonClick={() =>
                      handleButtonClick(
                        id,
                        idol.profilePicture,
                        title,
                        subtitle
                      )
                    }
                  >
                    {type === 'hot' && (
                      <div className={styles.key}>
                        {caculateProgress(receivedDonations, targetDonation)}%
                        달성
                      </div>
                    )}
                    {type === 'deadline' && (
                      <div className={styles.key}>
                        {getRamainingDays(deadline)}
                      </div>
                    )}
                  </Card>
                </li>
              );
            }
          )}
        </ul>
      </div>
      <button
        className={`${styles.button} ${styles.right}`}
        onClick={() => handleButton(currentIndex + 1)}
        disabled={currentIndex === maxIndex}
      >
        <img src={rightIcon} alt="다음 슬라이드" />
      </button>
    </div>
  ) : null;
};

export default CardList;
