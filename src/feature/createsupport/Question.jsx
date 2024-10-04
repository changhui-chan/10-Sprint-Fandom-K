import QUESTIONS from '@/shared/constant/QUESTIONS';
import styles from './Question.module.scss';

const Question = ({ data, isValid, value, handleValueChange }) => {
  const questionQuery = data.toUpperCase();
  const exampleQuery = `${questionQuery}_EX`;
  const errQuery = `${questionQuery}_ERR`;

  return (
    <div className={styles.question}>
      <p className={styles.question_text}>{QUESTIONS[questionQuery]}</p>
      <input
        className={
          isValid[data]
            ? `${styles.field}`
            : `${styles.field} ${styles.field_notvalid}`
        }
        value={value}
        onChange={handleValueChange}
      ></input>
      <p
        className={isValid[data] ? styles.errmsg_valid : styles.errmsg_notvalid}
      >
        {QUESTIONS[errQuery]}
      </p>
      <p className={styles.question_ex}>예시: {QUESTIONS[exampleQuery]}</p>
    </div>
  );
};

export default Question;
