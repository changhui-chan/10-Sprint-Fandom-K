import { QUESTIONS, IDOL_EX } from '@/shared/constant/QUESTIONS';
import styles from './Question.module.scss';
import Dropdown from './Dropdown';

// 데이터구조(api 개발 후 교체 예정)
const GENDER = ['남', '여'];
const GROUP = {
  성별: [],
  여: ['아이브', '뉴진스', '레드벨벳', '엔믹스', '트와이스'],
  남: ['방탄소년단', '세븐틴', '스트레이키즈'],
};
const MEMBER = {
  그룹명: [],
  뉴진스: ['민지', '혜인', '하니'],
  아이브: ['가을', '유진', '원영'],
  레드벨벳: ['아이린', '슬기', '조이'],
  엔믹스: ['해원'],
  트와이스: ['나연', '정연'],
  방탄소년단: ['RM', '진'],
  세븐틴: ['에스쿱스', '정한', '조슈아'],
  스트레이키즈: ['필릭스'],
};

const QuestionIdol = ({ data, value, handleValueChange }) => {
  const { gender, group, member } = value;
  const { handleGenderChange, handleGroupChange, handleMemberChange } =
    handleValueChange;

  const questionQuery = data.toUpperCase();

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>{QUESTIONS[questionQuery]}</p>
      <div className={styles.idolquestion}>
        <Dropdown
          className={styles.dropdown}
          list={GENDER}
          selected={gender}
          handleSelect={handleGenderChange}
          initial={IDOL_EX.GENDER}
        />
        <Dropdown
          className={styles.dropdown}
          list={GROUP[gender]}
          selected={group}
          handleSelect={handleGroupChange}
          initial={IDOL_EX.GROUP}
        />
        <Dropdown
          className={styles.dropdown}
          list={MEMBER[group]}
          selected={member}
          handleSelect={handleMemberChange}
          initial={IDOL_EX.MEMBER}
        />
      </div>
    </div>
  );
};
export default QuestionIdol;
