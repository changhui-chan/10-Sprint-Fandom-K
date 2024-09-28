import logo from '@/assets/images/logo.svg';
import styles from './Logo.module.scss';

const Logo = ({ customLogoStyle }) => {
  return (
    <img
      src={logo}
      alt="로고 이미지"
      className={`${styles.logo} ${customLogoStyle}`}
    />
  );
};
export default Logo;
