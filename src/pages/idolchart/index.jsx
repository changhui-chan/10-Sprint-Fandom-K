import { useState, useEffect } from 'react';
import IdolSelect from '@/pages/idolchart/components/IdolSelect/IdolSelect';
import IdolImage from '@/pages/idolchart/components/TopBanner/IdolImage';
import IdolList from '@/pages/idolchart/components/IdolList/IdolListChart';
import VoteButton from '@/pages/idolchart/components/VoteButton/VoteButton';
import getIdols from '@/shared/api/listApi';
import LoadMoreComponent from '@/pages/idolchart/components/MoreButton/IdolMore';
import styles from './styles.module.scss';

const ChartPage = () => {
  const [gender, setGender] = useState('female');
  const [idols, setIdols] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchIdols = async () => {
      try {
        const fetchedIdols = await getIdols(gender, 1, pageSize);
        setIdols(fetchedIdols);
      } catch (error) {
        console.error('Error fetching idols:', error);
      }
    };

    fetchIdols();
  }, [gender, pageSize]);

  const loadMoreIdols = async (newPageSize) => {
    try {
      const fetchedIdols = await getIdols(gender, 1, newPageSize);
      setIdols((prevIdols) => [...prevIdols, ...fetchedIdols]);
      setPageSize(newPageSize);
    } catch (error) {
      console.error('Error fetching more idols:', error);
    }
  };

  return (
    <div className={styles.chartPage}>
      <div className={styles.chartHeader}>
        <div className={styles.chartHead1}>
          <IdolImage gender={gender} />
        </div>
      </div>
      <div className={styles.chartInfo}>
        <h1 className={styles.mainTitle}>이달의 차트</h1>
        <VoteButton />
      </div>
      <div className={styles.genderSelect}>
        <IdolSelect onGenderChange={setGender} />
      </div>
      <IdolList items={idols} />
      <LoadMoreComponent onLoadMore={loadMoreIdols} pageSize={pageSize} />
    </div>
  );
};

export default ChartPage;
