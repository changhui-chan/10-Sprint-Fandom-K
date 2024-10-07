import Card from '@/shared/ui/Card';
import useModalStore from '@/shared/ui/modal/useModalStore';
import useCarousel from '@/shared/hooks/useCarousel';
import leftIcon from '@/assets/images/btn-pagination-left.svg';
import rightIcon from '@/assets/images/btn-pagination-right.svg';
import caculateProgress from '@/shared/utils/caculateProgress';
import { formatDate, getRamainingDays } from '@/shared/utils/formatDate';
import styles from './CardList.module.scss';

const CardList = ({ supports, type = '' }) => {
  const {
    currentIndex,
    maxIndex,
    translateX,
    carouselRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleButton,
  } = useCarousel(supports.length);

  const { openModal } = useModalStore();

  const handleButtonClick = (id, image, title, subtitle) => {
    openModal({ id, image, title, subtitle });
  };

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
          onMouseMove={handleTouchMove}
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
