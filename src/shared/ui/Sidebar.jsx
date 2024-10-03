import { Link } from 'react-router-dom';
import deleteIcon from '@/assets/images/btn-delete.svg';
import homeIcon from '@/assets/images/ic-home.svg';
import starIcon from '@/assets/images/ic-star.svg';
import rankIcon from '@/assets/images/ic-rank.svg';
import forwardIcon from '@/assets/images/ic-forward.svg';
import Avatar from './Avatar';
import Logo from './Logo';
import styles from './Sidebar.module.scss';
import { useSidebarStore } from './useSidebar';

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <div>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <div className={styles.header}>
              <Logo customLogoStyle={styles.logo} />
              <button onClick={toggle}>
                <img src={deleteIcon} alt="닫기 버튼" />
              </button>
            </div>
            <div className={styles.user}>
              <Avatar />
              <p>User</p>
            </div>
            <div className={styles.menu}>
              <section className={styles.general}>
                <span className={styles.label}>GENERAL</span>
                <nav className={styles.nav}>
                  <ul>
                    <li>
                      <img src={homeIcon} alt="홈 아이콘" />
                      <Link to="/" className={styles.link} onClick={toggle}>
                        <p>메인 페이지</p>
                        <img src={forwardIcon} alt="화살표 아이콘" />
                      </Link>
                    </li>
                    <li>
                      <img src={starIcon} alt="별 아이콘" />
                      <Link
                        to="/support"
                        className={styles.link}
                        onClick={toggle}
                      >
                        <p>후원하기</p>
                        <img src={forwardIcon} alt="화살표 아이콘" />
                      </Link>
                    </li>
                    <li>
                      <img src={rankIcon} alt="차트 아이콘" />
                      <Link
                        to="/chart"
                        className={styles.link}
                        onClick={toggle}
                      >
                        <p>차트</p>
                        <img src={forwardIcon} alt="화살표 아이콘" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
