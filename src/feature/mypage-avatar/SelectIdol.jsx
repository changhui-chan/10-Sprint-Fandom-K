import { useState } from 'react';
import IdolProfile from '@/feature/idolchart/components/IdolProfile/IdolProfile';
import IdolInfo from '@/feature/idolchart/components/IdolProfile/IdolInfo';
import Check from '@/assets/images/ic-check.svg';
import styles from './SelectIdol.module.scss';

const SelectIdol = ({
  item,
  profileSize = '115px',
  nameSize = '18px',
  groupSize = '14px',
}) => {
  const { name, group, profilePicture } = item;
  const [isSelect, setSelect] = useState(false);

  const handleButtonClick = () => {
    setSelect(!isSelect);
  };

  return (
    <div className={styles.selecticon}>
      <div className={styles.selectionContain}>
        <button
          className={styles.selecticon__profile}
          onClick={handleButtonClick}
        >
          <div className={styles.profileWrapper}>
            <IdolProfile
              profilePicture={profilePicture}
              name={name}
              size={profileSize}
            />
            {isSelect && (
              <div className={styles.overlay}>
                <img src={Check} alt="check" className={styles.checkIcon} />
              </div>
            )}
          </div>
        </button>
        <div className={styles.selectInfo}>
          <IdolInfo name={name} nameSize={nameSize} />
          <IdolInfo group={group} groupSize={groupSize} />
        </div>
      </div>
    </div>
  );
};

export default SelectIdol;
