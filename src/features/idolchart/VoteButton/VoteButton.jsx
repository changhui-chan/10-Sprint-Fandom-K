import Button from '@/shared/ui/Button';
import styles from './VoteButton.module.scss';

const VoteButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className={styles.voteButton}>
      투표하기
    </Button>
  );
};

export default VoteButton;
