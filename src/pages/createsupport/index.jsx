import CreateSupportForm from '@/features/createsupport/CreateSupportForm';
import styles from '@/pages/createsupport/index.module.scss';

const CreateSupportPage = () => {
  return (
    <div className={styles.container}>
      <CreateSupportForm />
    </div>
  );
};

export default CreateSupportPage;
