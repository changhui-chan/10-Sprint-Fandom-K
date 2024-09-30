import styles from './IdolInfo.module.scss';

const IdolInfo = ({ rank, name, group }) => {
  return (
    <div className={styles.idolInfo}>
      <div className={styles.idolRank}>{rank}</div>
      <div className={styles.idolGroup}>{group}</div>
      <div className={styles.idolName}>{name}</div>
    </div>
  );
};

export default IdolInfo;
