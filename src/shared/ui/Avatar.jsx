import defaultImg from '@/assets/images/img-default-avatar.svg';
import styles from './Avatar.module.scss';

const Avatar = ({
  src = defaultImg,
  alt = '아바타 이미지',
  customImageStyle,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.image} ${customImageStyle}`}
    />
  );
};

export default Avatar;
