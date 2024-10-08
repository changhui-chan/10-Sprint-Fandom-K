import { QUESTIONS } from '@/shared/constant/QUESTIONS';
import styles from './Question.module.scss';

const Question = ({ data, isValid, value, handleValueChange }) => {
  const questionQuery = data.toUpperCase();
  const exampleQuery = `${questionQuery}_EX`;
  const errQuery = `${questionQuery}_ERR`;

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>{QUESTIONS[questionQuery]}</p>
      <input
        className={
          isValid[data]
            ? `${styles.field}`
            : `${styles.field} ${styles.fieldNotvalid}`
        }
        value={value}
        onChange={handleValueChange}
      ></input>
      <p className={isValid[data] ? styles.errmsgValid : styles.errmsgNotvalid}>
        {QUESTIONS[errQuery]}
      </p>
      <p className={styles.questionEx}>예시: {QUESTIONS[exampleQuery]}</p>
    </div>
  );
};

export default Question;
