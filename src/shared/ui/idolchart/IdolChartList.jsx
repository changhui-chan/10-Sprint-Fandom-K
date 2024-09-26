import './IdolChartList.scss';
import IdolProfileWrapper from './idollistcomponents/IdolProfileWrapper';
import IdolInfo from './idollistcomponents/IdolInfo';

const IdolListItem = ({ item }) => {
  const { name, group, profilePicture, rank, totalVotes } = item;

  return (
    <div className="idolListItem">
      <div className="idolFirstSection">
        <IdolProfileWrapper profilePicture={profilePicture} name={name} />
        <IdolInfo rank={rank} />
        <div className="idolGandN">
          <IdolInfo group={group} />
          <IdolInfo name={name} />
        </div>
      </div>
      <div className="idolVote">{totalVotes}표</div>
    </div>
  );
};

const IdolList = ({ items = [] }) => {
  return (
    <ul className="idolList">
      {items.map((item) => (
        <li key={item.id}>
          <IdolListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default IdolList;
