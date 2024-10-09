import IdolProfile from '@/features/idolchart/IdolProfile/IdolProfile';
import IdolInfo from '@/features/idolchart/IdolProfile/IdolInfo';
import True from '@/assets/images/radio-true.svg';
import False from '@/assets/images/radio-false.svg';
import styles from './ModalList.module.scss';

const ModalListItem = ({ item, isSelected, onClick }) => {
  const { id: itemId, name, group, profilePicture, totalVotes } = item;

  return (
    <div className={styles.idolListItem}>
      <div className={styles.idolFirstSection}>
        <IdolProfile profilePicture={profilePicture} name={name} />
        <div className={styles.idolGandNandV}>
          <div className={styles.idolGandN}>
            <IdolInfo group={group} />
            <div className={styles.idolName}>
              <IdolInfo name={name} />
            </div>
          </div>
          <div className={styles.idolVote}>{totalVotes.toLocaleString()}표</div>
        </div>
      </div>
      <label htmlFor={`idol-radio-${itemId}`} className={styles.radioLabel}>
        <input
          type="radio"
          id={`idol-radio-${itemId}`}
          checked={isSelected}
          onChange={onClick}
          className={styles.radioInput}
        />
        <span className={styles.radioIcon}>
          <img src={isSelected ? True : False} alt="radio-icon" />
        </span>
      </label>
    </div>
  );
};

export default ModalListItem;
