import Menu from '@/assets/images/ic-menu.svg';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import styles from './Header.module.scss';
import Credit from '../ui/Credit';
import Avatar from '../ui/Avatar';
import Sidebar from '../ui/Sidebar';
import { useSidebarStore } from '../ui/useSidebar';

const Header = () => {
  const { openSidebar } = useSidebarStore();

  const onClick = () => {
    openSidebar();
  };

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={onClick}>
          <img src={Menu} alt="메뉴" className={styles.menu} />
        </button>
        <Link to="/support">
          <Logo customLogoStyle={styles.logo} />
        </Link>
        <div className={styles.user}>
          <Credit />
          <Link to="/mypage">
            <Avatar />
          </Link>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Header;
