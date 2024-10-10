import styles from './IdolImage.module.scss';

const IdolImage = ({ idol }) => {
  return (
    <div className={styles.idolImageWrapper}>
      {idol && (
        <img
          src={idol.profilePicture}
          alt={idol.name}
          className={styles.idolImage}
        />
      )}
    </div>
  );
};

export default IdolImage;
