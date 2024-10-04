import { useState } from 'react';
import styles from './IdolSelect.module.scss';

const IdolSelect = ({ onGenderChange }) => {
  const [gender, setGender] = useState('female');

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    onGenderChange(newGender);
  };

  return (
    <div className={styles.chartButton}>
      <button
        type="button"
        className={`${styles.chartButton} ${gender === 'female' ? styles.current : ''}`}
        onClick={() => handleGenderChange('female')}
      >
        이달의 여자 아이돌
      </button>
      <button
        type="button"
        className={`${styles.chartButton} ${gender === 'male' ? styles.current : ''}`}
        onClick={() => handleGenderChange('male')}
      >
        이달의 남자 아이돌
      </button>
    </div>
  );
};

export default IdolSelect;
