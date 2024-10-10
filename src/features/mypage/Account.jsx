import { useCallback, useEffect, useState } from 'react';
import leftIcon from '@/assets/images/btn-pagination-left.svg';
import rightIcon from '@/assets/images/btn-pagination-right.svg';
import addIcon from '@/assets/images/ic-plus.svg';
import deleteIcon from '@/assets/images/ic-delete.svg';
import styles from './Account.module.scss';
import SelectIdol from './SelectIdol';
import {
  useAccountStore,
  useIdolStateStore,
  useSelectedIdolListStore,
} from './useAccountStore';
import useCarousel from '../../shared/hooks/useCarousel';
import LoadingBar from '../loading';
import ErrorMessage from '../error';

const Account = () => {
  const { isLoading, error, idolData, fetchAccount } = useAccountStore();
  const { addIdolState, resetIdolState } = useIdolStateStore();
  const {
    selectedIdolList,
    tempIdolList,
    addIdol,
    removeIdol,
    addTempIdol,
    removeTempIdol,
  } = useSelectedIdolListStore();
  const [idolToShow, setIdolToShow] = useState(16);
  const allCarousel = useCarousel(idolData.length / 2, idolToShow, 155);
  const selectedCarousel = useCarousel(
    selectedIdolList.length,
    idolToShow,
    155
  );

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useCallback(() => {
    addIdolState(idolData);
  }, [addIdolState, idolData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1199) {
        setIdolToShow(16);
      } else if (window.innerWidth > 767) {
        setIdolToShow(8);
      } else {
        setIdolToShow(6);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIdolToShow]);

  const handleTempIdolList = (idol) => {
    if (tempIdolList.includes(idol)) {
      removeTempIdol(idol);
    } else {
      addTempIdol(idol);
    }
  };

  const handleAddIdol = () => {
    if (tempIdolList.length <= 0) return;
    const selectedIdolIds = selectedIdolList.map((idol) => idol.id);
    const filteredTempIdolList = tempIdolList.filter(
      (idol) => !selectedIdolIds.includes(idol.id)
    );
    addIdol(filteredTempIdolList);
    resetIdolState(idolData);
    removeTempIdol(tempIdolList);
  };

  const handleRemoveIdol = (idol) => {
    removeIdol(idol);
  };

  return (
    <div className={styles.fragment}>
      <LoadingBar isLoading={isLoading} />
      {error ? (
        <ErrorMessage onClick={fetchAccount} />
      ) : (
        <>
          <p className={styles.selectedTitle}>내가 관심있는 아이돌</p>
          <div className={styles.wrapper}>
            <button
              className={`${styles.button} ${styles.left}`}
              onClick={() =>
                selectedCarousel.handleButton(selectedCarousel.currentIndex - 1)
              }
              disabled={selectedCarousel.currentIndex === 0}
            >
              <img src={leftIcon} alt="이전 슬라이드" />
            </button>
            <div className={styles.container}>
              <ul
                className={styles.selectedIdolList}
                ref={selectedCarousel.carouselRef}
                onTouchStart={selectedCarousel.handleTouchStart}
                onTouchMove={selectedCarousel.handleTouchMove}
                onTouchEnd={selectedCarousel.handleTouchEnd}
                onMouseDown={selectedCarousel.handleTouchStart}
                onMouseMove={selectedCarousel.handleTouchMove}
                onMouseUp={selectedCarousel.handleTouchEnd}
                onMouseLeave={selectedCarousel.handleTouchEnd}
                role="listbox"
                style={{
                  transform: `translateX(${selectedCarousel.translateX}px)`,
                }}
              >
                {selectedIdolList.map((idol) => (
                  <li key={idol.id} className={styles.idol}>
                    <SelectIdol item={idol} preventClick="true" />
                    <button
                      type="button"
                      onClick={() => handleRemoveIdol(idol)}
                    >
                      <img
                        src={deleteIcon}
                        alt="삭제"
                        className={styles.deleteIcon}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`${styles.button} ${styles.right}`}
              onClick={() =>
                selectedCarousel.handleButton(selectedCarousel.currentIndex + 1)
              }
              disabled={
                selectedCarousel.currentIndex === selectedCarousel.maxIndex ||
                !selectedIdolList ||
                selectedIdolList.length <= idolToShow / 2
              }
            >
              <img src={rightIcon} alt="다음 슬라이드" />
            </button>
          </div>
          <hr className={styles.hr} />
          <p className={styles.addTitle}>관심 있는 아이돌을 추가해보세요.</p>
          <div className={styles.wrapper}>
            <button
              className={`${styles.button} ${styles.left}`}
              onClick={() =>
                allCarousel.handleButton(allCarousel.currentIndex - 1)
              }
              disabled={allCarousel.currentIndex === 0}
            >
              <img src={leftIcon} alt="이전 슬라이드" />
            </button>
            <div className={styles.container}>
              <ul
                className={styles.idolList}
                ref={allCarousel.carouselRef}
                onTouchStart={allCarousel.handleTouchStart}
                onTouchMove={allCarousel.handleTouchMove}
                onTouchEnd={allCarousel.handleTouchEnd}
                onMouseDown={allCarousel.handleTouchStart}
                onMouseMove={allCarousel.handleTouchMove}
                onMouseUp={allCarousel.handleTouchEnd}
                onMouseLeave={allCarousel.handleTouchEnd}
                role="listbox"
                style={{ transform: `translateX(${allCarousel.translateX}px)` }}
              >
                {idolData.map((idol) => (
                  <li key={idol.id} className={styles.idol}>
                    <button
                      type="button"
                      onClick={() => handleTempIdolList(idol)}
                    >
                      <SelectIdol item={idol} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`${styles.button} ${styles.right}`}
              onClick={() =>
                allCarousel.handleButton(allCarousel.currentIndex + 1)
              }
              disabled={allCarousel.currentIndex === allCarousel.maxIndex}
            >
              <img src={rightIcon} alt="다음 슬라이드" />
            </button>
          </div>
          <button
            type="button"
            className={styles.addIdol}
            onClick={() => handleAddIdol()}
          >
            <img src={addIcon} alt="아이돌 추가" />
            추가하기
          </button>
        </>
      )}
    </div>
  );
};

export default Account;
