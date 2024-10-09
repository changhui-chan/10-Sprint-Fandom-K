import { useCreditStore } from '@/entities/store/store';
import { useIdolStateStore } from '@/features/mypage/useAccountStore';
import Button from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';

import styles from './EnterButton.module.scss';

const EnterButton = () => {
  const { resetCredit } = useCreditStore();
  const { resetIdolState } = useIdolStateStore();
  const navigate = useNavigate();

  const handleClick = async () => {
    await resetCredit();
    await resetIdolState();
    navigate('/chart');
  };

  return (
    <Button className={styles.enterButton} onClick={handleClick}>
      지금 시작하기
    </Button>
  );
};

export default EnterButton;
