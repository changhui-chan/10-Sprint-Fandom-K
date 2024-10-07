import Home1 from '@/assets/images/img-home1.svg';
import Home2 from '@/assets/images/img-home2.svg';
import Home3 from '@/assets/images/img-home3.svg';
import logo from '@/assets/images/logo.svg';
import Line from '@/assets/images/img-line.svg';
import NewJeans from '@/assets/images/img-newjeans.svg';
import Illit from '@/assets/images/img-illit.svg';
import TheBoyz from '@/assets/images/img-theboyz.svg';
import topPhoto from '@/assets/images/img-landing.svg';
import EnterButton from './enterbutton/EnterButton';
import styles from './styles.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.allContain}>
      <div className={styles.topContain}>
        <div className={styles.titleContain1}>
          <h3 className={styles.title}>내가 좋아하는 아이돌을</h3>
          <div className={styles.smtitleContain}>
            <h3 className={styles.title}>가장&nbsp;</h3>
            <h3 className={styles.titleO}>쉽게 덕질</h3>
            <h3 className={styles.title}>&nbsp;하는 방법</h3>
          </div>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <img src={topPhoto} alt="topphoto" className={styles.topPhoto} />
        <div className={styles.buttonContain}>
          <EnterButton />
        </div>
      </div>
      <div className={styles.bottomContain}>
        <img src={Line} alt="line" className={styles.longLine} />
        <div className={styles.behindContain}>
          <div className={styles.frontContain}>
            <div className={styles.titleContain2}>
              <p className={styles.subTitle}>후원하기</p>
              <h3 className={styles.title}>좋아하는 아이돌에게</h3>
              <h3 className={styles.title}>쉽게 후원해보세요</h3>
            </div>
            <img src={Home1} alt="home1" className={styles.homeComponent} />
          </div>
          <div className={styles.photoContain}>
            <img src={NewJeans} alt="newjeans" className={styles.backImg} />
          </div>
        </div>

        <div className={styles.behindContain}>
          <div className={styles.frontContain}>
            <div className={styles.titleContain2}>
              <p className={styles.subTitle}>이달의 아티스트</p>
              <h3 className={styles.title}>내 아티스트에게</h3>
              <h3 className={styles.title}>영예를 선물하세요</h3>
            </div>
            <img src={Home2} alt="home2" className={styles.homeComponent} />
          </div>
          <div className={styles.photoContain}>
            <img src={TheBoyz} alt="theboyz" className={styles.backImg} />
          </div>
        </div>

        <div className={styles.behindContain}>
          <div className={styles.frontContain}>
            <div className={styles.titleContain2}>
              <p className={styles.subTitle}>나만의 아티스트</p>
              <h3 className={styles.title}>좋아하는 아티스트들의</h3>
              <h3 className={styles.title}>소식을 모아보세요</h3>
            </div>
            <img src={Home3} alt="home3" className={styles.homeComponent} />
          </div>
          <div className={styles.photoContain}>
            <img src={Illit} alt="Illit" className={styles.backImg} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
