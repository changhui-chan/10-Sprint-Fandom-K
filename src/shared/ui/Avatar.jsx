import styles from './Avatar.module.scss';

const Avatar = ({ src = '', alt = '아바타 이미지', customImageStyle }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.image} ${customImageStyle}`}
    />
  );
};

export default Avatar;
