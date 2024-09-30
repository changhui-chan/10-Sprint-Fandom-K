import QUESTIONS from '@/shared/constant/QUESTIONS';
import styles from './Question.module.scss';

const Question = ({ data, value, handleValueChange }) => {
  const questionQuery = data.toUpperCase();
  const exampleQuery = `${questionQuery}_EX`;

  return (
    <div className={styles.question}>
      <p className={styles.question_text}>{QUESTIONS[questionQuery]}</p>
      <input
        className={styles.field}
        value={value}
        onChange={handleValueChange}
      ></input>
      <p className={styles.question_ex}>예시: {QUESTIONS[exampleQuery]}</p>
    </div>
  );
};
export default Question;
