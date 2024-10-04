import { useEffect, useState } from 'react';
import getIdols from '../../listApi';
import styles from './IdolImage.module.scss';

const IdolImage = ({ gender }) => {
  const [topIdol, setTopIdol] = useState(null);

  useEffect(() => {
    const fetchTopIdol = async () => {
      try {
        const idols = await getIdols(gender, 1, 1);
        if (idols.length > 0) {
          setTopIdol(idols[0]);
        }
      } catch (error) {
        console.error('Error fetching top idol:', error);
      }
    };

    fetchTopIdol();
  }, [gender]);

  if (!topIdol) return null;

  return (
    <div className={styles.idolImageWrapper}>
      <img
        src={topIdol.profilePicture}
        alt={topIdol.name}
        className={styles.idolImage}
      />
    </div>
  );
};

export default IdolImage;
