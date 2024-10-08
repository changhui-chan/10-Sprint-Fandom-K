import Check from '@/assets/images/ic-check.svg';
import styles from './SelectIdol.module.scss';
import IdolInfo from '../idolchart/IdolProfile/IdolInfo';
import IdolProfile from '../idolchart/IdolProfile/IdolProfile';
import { useIdolStateStore } from './useAccountStore';

const SelectIdol = ({
  item,
  profileSize = '115px',
  nameSize = '18px',
  groupSize = '14px',
  preventClick = false,
}) => {
  const { name, group, profilePicture } = item;
  const { idolState, toggleIdolState } = useIdolStateStore();

  const handleButtonClick = () => {
    toggleIdolState(item);
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
            {!preventClick && idolState[item.id] && (
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
