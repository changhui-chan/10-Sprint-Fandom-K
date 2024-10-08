import styles from './Dropdown.module.scss';

const Dropdown = ({ list, selected, handleSelect, initial }) => {
  return (
    <select
      className={
        selected === `${initial}`
          ? `${styles.select} ${styles.placeholder}`
          : `${styles.select}`
      }
      onChange={handleSelect}
      value={selected}
    >
      <option disabled hidden>
        {`${initial}`}
      </option>
      {list.map((item) => (
        <option className={styles.option} value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
