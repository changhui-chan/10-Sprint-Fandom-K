import styles from './IdolInfo.module.scss';

const IdolInfo = ({
  rank,
  name,
  group,
  nameSize = '16px',
  groupSize = '16px',
  rankSize = '20px',
}) => {
  return (
    <div className={styles.idolInfo}>
      {rank && (
        <div className={styles.idolRank} style={{ fontSize: rankSize }}>
          {rank}
        </div>
      )}
      <div className={styles.idolGroup} style={{ fontSize: groupSize }}>
        {group}
      </div>
      <div className={styles.idolName} style={{ fontSize: nameSize }}>
        {name}
      </div>
    </div>
  );
};

export default IdolInfo;
