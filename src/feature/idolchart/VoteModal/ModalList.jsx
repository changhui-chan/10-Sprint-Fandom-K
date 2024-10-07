import IdolProfile from '@/feature/idolchart/IdolProfile/IdolProfile';
import IdolInfo from '@/feature/idolchart/IdolProfile/IdolInfo';
import True from '@/assets/images/radio-true.svg';
import False from '@/assets/images/radio-false.svg';
import styles from './ModalList.module.scss';
import useSelectedIdolStore from './useSelectedIdolStore';

const ModalListItem = ({ item }) => {
  const { id: itemId, name, group, profilePicture, totalVotes } = item;

  const selectedIdolId = useSelectedIdolStore((state) => state.selectedIdolId);
  const setSelectedIdolId = useSelectedIdolStore(
    (state) => state.setSelectedIdolId
  );

  const handleRadioChange = (id) => {
    setSelectedIdolId(id);
  };

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
          checked={selectedIdolId === itemId}
          onChange={() => handleRadioChange(itemId)}
          className={styles.radioInput}
        />
        <span className={styles.radioIcon}>
          <img
            src={selectedIdolId === itemId ? True : False}
            alt="radio-icon"
          />
        </span>
      </label>
    </div>
  );
};

export default ModalListItem;
