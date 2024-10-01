import { useEffect } from 'react';
import useSupportStore from './useSupportStore';
import CardList from './CardList';
import styles from './index.module.scss';

const Support = () => {
  const { supports, isLoading, error, fetchSupports } = useSupportStore();

  useEffect(() => {
    fetchSupports();
  }, [fetchSupports]);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <CardList supports={supports} />;
};

export default Support;
