import Button from '@/shared/ui/Button';
import styles from './VoteButton.module.scss';

const VoteButton = ({ onClick }) => {
  return (
    <div className={styles.voteButton}>
      <Button onClick={onClick}>투표하기</Button>
    </div>
  );
};

export default VoteButton;
