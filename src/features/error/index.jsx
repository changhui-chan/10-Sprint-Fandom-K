import errorIcon from '@/assets/images/ic-error.svg';
import styles from './index.module.scss';
import Button from '../../shared/ui/Button';

const ErrorMessage = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <img src={errorIcon} alt="에러 아이콘" className={styles.icon} />
      <p>데이터 로딩에 실패하셨습니다</p>
      <Button className={styles.button} onClick={onClick}>
        새로고침
      </Button>
    </div>
  );
};

export default ErrorMessage;
