import Button from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EnterButton.module.scss';

const EnterButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      className={styles.enterButton}
      onClick={() => {
        navigate('/chart');
      }}
    >
      지금 시작하기
    </Button>
  );
};

export default EnterButton;
