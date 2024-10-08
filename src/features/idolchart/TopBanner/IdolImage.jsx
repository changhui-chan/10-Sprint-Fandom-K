import useIdolStore from '@/features/idolchart/useIdolStore';
import styles from './IdolImage.module.scss';

const IdolImage = () => {
  const { topIdol } = useIdolStore();

  return (
    <div className={styles.idolImageWrapper}>
      {topIdol && (
        <img
          src={topIdol.profilePicture}
          alt={topIdol.name}
          className={styles.idolImage}
        />
      )}
    </div>
  );
};

export default IdolImage;
