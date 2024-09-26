import Button from './Button';
import styles from './Card.module.scss';

const Card = ({ idolImg }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={idolImg} alt="아이돌 이미지" className={styles.image} />
        <Button className={styles.button}>후원하기</Button>
      </div>
    </div>
  );
};

export default Card;
