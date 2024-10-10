import Button from '@/shared/ui/Button';
import errorIcon from '@/assets/images/ic-error.svg';
import reloadIcon from '@/assets/images/ic-reload.svg';
import styles from './index.module.scss';

const ErrorMessage = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <img src={errorIcon} alt="에러 아이콘" className={styles.icon} />
      <p>리소스를 불러오지 못했습니다</p>
      <Button className={styles.button} onClick={onClick}>
        <img src={reloadIcon} alt="새로고침 아이콘" />
        새로고침
      </Button>
    </div>
  );
};

export default ErrorMessage;
