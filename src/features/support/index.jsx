import { useEffect } from 'react';
import caculateProgress from '@/shared/utils/caculateProgress';
import useSupportStore from './useSupportStore';
import CardList from './CardList';
import SupportModal from './SupportModal';
import AlertModal from '../credit/AlertModal';
import ErrorMessage from '../error';
import LoadingBar from '../loading';
import styles from './index.module.scss';

const Support = () => {
  const { supports, isLoading, error, fetchSupports } = useSupportStore();

  useEffect(() => {
    fetchSupports();
  }, [fetchSupports]);

  return (
    <section className={styles.container}>
      <LoadingBar isLoading={isLoading} />
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <p>
            서포트 개설 후<br />
            목표 달성을 통해
          </p>
          <h1>최애에게 사랑을 전해보세요</h1>
        </div>
      </div>
      {error ? (
        <ErrorMessage onClick={fetchSupports} />
      ) : (
        <>
          <div className={styles.cardList}>
            <h2>지금 가장 핫한 서포트</h2>
            <CardList
              supports={supports.toSorted(
                (a, b) =>
                  caculateProgress(b.receivedDonations, b.targetDonation) -
                  caculateProgress(a.receivedDonations, a.targetDonation)
              )}
              type="hot"
            />
          </div>
          <div className={styles.cardList}>
            <h2>마감 임박 서포트</h2>
            <CardList
              supports={supports.toSorted(
                (a, b) => new Date(a.deadline) - new Date(b.deadline)
              )}
              type="deadline"
            />
          </div>
          <div className={styles.cardList}>
            <h2>전체 서포트</h2>
            <CardList supports={supports} />
          </div>
        </>
      )}
      <SupportModal />
      <AlertModal />
    </section>
  );
};

export default Support;
