import styles from './IdolListChart.module.scss';
import IdolProfile from '../IdolProfile/IdolProfile';
import IdolInfo from '../IdolProfile/IdolInfo';

const IdolListItem = ({ item }) => {
  const { name, group, profilePicture, rank, totalVotes } = item;

  return (
    <div className={styles.idolListItem}>
      <div className={styles.idolFirstSection}>
        <IdolProfile profilePicture={profilePicture} name={name} />
        <IdolInfo rank={rank} />
        <div className={styles.idolGandN}>
          <IdolInfo group={group} />
          <IdolInfo name={name} />
        </div>
      </div>
      <div className={styles.idolVote}>{totalVotes}표</div>
    </div>
  );
};

const IdolList = ({ items = [] }) => {
  return (
    <ul className={styles.idolList}>
      {items.map((item) => (
        <li key={item.id}>
          <IdolListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default IdolList;
