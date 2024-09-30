import { useState } from 'react';
import Button from '@/shared/ui/Button';
import styles from './VoteButton.module.scss';

const VoteButton = () => {
  return (
    <div className={styles.voteButton}>
      <Button>차트 투표하기</Button>
    </div>
  );
};

export default VoteButton;
