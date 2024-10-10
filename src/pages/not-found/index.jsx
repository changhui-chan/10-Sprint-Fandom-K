import sadIcon from '@/assets/images/ic-sad.svg';
import styles from './index.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={sadIcon} alt="404 아이콘" />
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFound;
