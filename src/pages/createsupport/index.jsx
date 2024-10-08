import CreateSupportForm from '@/features/createsupport/CreateSupportForm';
import styles from '@/pages/createsupport/index.module.scss';
import Header from '../../shared/layout/Header';

const CreateSupportPage = () => {
  return (
    <div className={styles.background}>
      <Header />
      <CreateSupportForm />
    </div>
  );
};
// 의미x div는 <>fh 교체

export default CreateSupportPage;
