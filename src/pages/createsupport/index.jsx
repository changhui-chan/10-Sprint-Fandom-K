import CreateSupportForm from '@/features/createsupport/CreateSupportForm';
import styles from '@/pages/createsupport/index.module.scss';

const CreateSupportPage = () => {
  return (
    <div className={styles.background}>
      <CreateSupportForm />
    </div>
  );
};
// 의미x div는 <>fh 교체

export default CreateSupportPage;
