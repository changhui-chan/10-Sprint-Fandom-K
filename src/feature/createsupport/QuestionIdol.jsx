import QUESTIONS from '@/shared/constant/QUESTIONS';
import styles from './Question.module.scss';

const QuestionIdol = ({ data, value, handleValueChange }) => {
  const [gender, group, member] = value;
  const [handleGenderChange, handleGroupChange, handleMemberChange] =
    handleValueChange;
  const questionQuery = data.toUpperCase();
  return (
    <div className={styles.question}>
      <p className={styles.question_text}>{QUESTIONS[questionQuery]}</p>
      <div className={styles.idolquestion}>
        <input
          className={styles.field}
          value={gender}
          placeholder="성별"
          onChange={handleGenderChange}
        ></input>
        <input
          className={styles.field}
          value={group}
          placeholder="그룹명"
          onChange={handleGroupChange}
        ></input>
        <input
          className={styles.field}
          value={member}
          placeholder="멤버이름"
          onChange={handleMemberChange}
        ></input>
      </div>
    </div>
  );
};
export default QuestionIdol;
