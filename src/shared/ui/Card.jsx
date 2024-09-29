import creditIcon from '@/assets/images/credit.svg';
import Button from './Button';
import styles from './Card.module.scss';

const Card = ({
  idolImg,
  title,
  subtitle,
  received,
  deadline,
  progress = 0,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={idolImg} alt="아이돌 이미지" className={styles.image} />
        <Button className={styles.button}>후원하기</Button>
      </div>
      <div className={styles.content}>
        <h4>{subtitle}</h4>
        <h3>{title}</h3>
        <p className={styles.info}>
          <img src={creditIcon} alt="크레딧 아이콘" />
          <span className={styles.received}>{received}</span>
          <span className={styles.date}>{deadline}</span>
        </p>
        <progress className={styles.progress} value={progress} max="100">
          {progress}%
        </progress>
      </div>
      {children}
    </div>
  );
};

export default Card;
