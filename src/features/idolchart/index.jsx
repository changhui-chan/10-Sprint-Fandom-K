import { useState, useEffect, useRef } from 'react';
import IdolSelect from '@/features/idolchart/IdolSelect/IdolSelect';
import IdolImage from '@/features/idolchart/TopBanner/IdolImage';
import IdolList from '@/features/idolchart/IdolList/IdolListChart';
import LoadMoreComponent from '@/features/idolchart/MoreButton/IdolMore';
import VoteButton from '@/features/idolchart/VoteButton/VoteButton';
import VoteModal from '@/features/idolchart/VoteModal/VoteModal';
import useModalStore from '@/shared/ui/modal/useModalStore';
import { useCreditStore } from '@/entities/store/store';
import AlertModal from '../credit/AlertModal';
import styles from './styles.module.scss';
import useIdolStore from './useIdolStore';
import useFullIdolStore from './useFullStore';
import ErrorMessage from '../error';
import LoadingBar from '../loading';

const Chart = () => {
  const { fullIdols, fetchAllIdols } = useFullIdolStore();
  const { idols, fetchIdols, pageSize, setPageSize, error, isLoading } =
    useIdolStore();
  const [gender, setGender] = useState('female');
  const { openModal, closeModal } = useModalStore();
  const { credit } = useCreditStore();

  const modalId = useRef('chart');
  const alertId = useRef('alert');

  useEffect(() => {
    fetchAllIdols(gender);
  }, [gender, fetchAllIdols]);

  useEffect(() => {
    setPageSize(10);
    fetchIdols(gender, 10);
  }, [gender, fetchIdols, setPageSize]);

  useEffect(() => {
    fetchIdols(gender, pageSize);
  }, [gender, pageSize, fetchIdols]);

  const handleModalClose = async () => {
    await fetchIdols(gender, pageSize);
    await fetchAllIdols(gender);
    closeModal(modalId.current);
  };

  const loadMoreIdols = async () => {
    const newPageSize = pageSize + 10;
    await fetchIdols(gender, newPageSize);
    setPageSize(newPageSize);
  };

  const handleVoteClick = () => {
    if (credit < 1000) {
      openModal(alertId.current);
      return;
    }
    openModal(modalId.current);
  };

  return (
    <div className={styles.chartPage}>
      <LoadingBar isLoading={isLoading} />
      <div className={styles.chartHeader}>
        <div className={styles.chartHead1}>
          {idols.length && <IdolImage idol={idols[0]} />}
        </div>
      </div>
      <div className={styles.chartInfo}>
        <h1 className={styles.mainTitle}>이달의 차트</h1>
        <VoteButton onClick={handleVoteClick} />
      </div>
      <IdolSelect onGenderChange={setGender} />
      {error ? (
        <ErrorMessage
          onClick={() => {
            setPageSize(10);
            fetchIdols(gender, 10);
          }}
        />
      ) : (
        <>
          <IdolList items={idols} />
          <LoadMoreComponent onLoadMore={loadMoreIdols} />
        </>
      )}
      <VoteModal items={fullIdols} onClose={handleModalClose} gender={gender} />
      <AlertModal />
    </div>
  );
};

export default Chart;
