import styles from './IdolProfile.module.scss';

const IdolProfile = ({ profilePicture, name, isSelected }) => {
  return (
    <div
      className={`${styles.idolProfileWrapper} ${isSelected ? styles.selected : ''}`}
    >
      <img src={profilePicture} alt={name} className={styles.idolProfile} />
    </div>
  );
};

export default IdolProfile;
