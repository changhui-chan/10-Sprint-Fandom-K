import Support from '@/features/support';
import styles from './index.module.scss';
import Header from '../../shared/layout/Header';

const SupportPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Support />
    </div>
  );
};

export default SupportPage;
