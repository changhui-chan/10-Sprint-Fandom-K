import styles from './IdolProfile.module.scss';

const IdolProfile = ({ profilePicture, name, isSelected, size = '60px' }) => {
  return (
    <div
      className={`${styles.idolProfileWrapper} ${isSelected ? styles.selected : ''}`}
      style={{ width: size, height: size }}
    >
      <img
        src={profilePicture}
        alt={name}
        className={styles.idolProfile}
        style={{ width: '100%', height: '100%' }}
      />
      {isSelected && <div className={styles.overlay}></div>}
    </div>
  );
};

export default IdolProfile;
