import { useEffect } from 'react';
import useSupportStore from './useSupportStore';
import CardList from './CardList';
import SupportModal from './SupportModal';
import styles from './index.module.scss';

const Support = () => {
  const { supports, isLoading, error, fetchSupports } = useSupportStore();

  useEffect(() => {
    fetchSupports();
  }, [fetchSupports]);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <CardList supports={supports} />
      <SupportModal />
    </div>
  );
};

export default Support;
