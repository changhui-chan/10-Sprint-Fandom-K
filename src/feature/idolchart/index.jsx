import { useEffect, useState } from 'react';
import IdolSelect from '@/feature/idolchart/IdolSelect/IdolSelect';
import IdolImage from '@/feature/idolchart/TopBanner/IdolImage';
import IdolList from '@/feature/idolchart/IdolList/IdolListChart';
import LoadMoreComponent from '@/feature/idolchart/MoreButton/IdolMore';
import VoteButton from '@/feature/idolchart/VoteButton/VoteButton';
import VoteModal from '@/feature/idolchart/VoteModal/VoteModal';
import useModalStore from '@/shared/ui/modal/useModalStore';
import styles from './styles.module.scss';
import useIdolStore from './useIdolStore';

const ChartPage = () => {
  const { idols, fetchIdols, topIdol, pageSize, setPageSize } = useIdolStore();
  const [gender, setGender] = useState('female');
  const { isVisible, openModal, closeModal } = useModalStore();

  useEffect(() => {
    setPageSize(10);
    fetchIdols(gender, 10);
  }, [gender, fetchIdols, setPageSize]);

  useEffect(() => {
    fetchIdols(gender, pageSize);
  }, [gender, pageSize, fetchIdols]);

  const loadMoreIdols = async () => {
    const newPageSize = pageSize + 10;
    await fetchIdols(gender, newPageSize);
    setPageSize(newPageSize);
  };

  return (
    <div className={styles.chartPage}>
      <div className={styles.chartHeader}>
        <div className={styles.chartHead1}>
          {topIdol && <IdolImage idol={topIdol} />}
        </div>
      </div>
      <div className={styles.chartInfo}>
        <h1 className={styles.mainTitle}>이달의 차트</h1>
        <VoteButton onClick={openModal} />
      </div>
      <IdolSelect onGenderChange={setGender} />
      <IdolList items={idols} />
      <LoadMoreComponent onLoadMore={loadMoreIdols} />

      {isVisible && <VoteModal items={idols} onClose={closeModal} />}
    </div>
  );
};

export default ChartPage;
