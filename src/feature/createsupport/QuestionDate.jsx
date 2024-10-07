import { QUESTIONS } from '@/shared/constant/QUESTIONS';
import InputDate from './InputDate';
import styles from './Question.module.scss';

const QuestionDate = ({ data, isValid, value, handleValueChange }) => {
  const questionQuery = data.toUpperCase();
  const errQuery = `${questionQuery}_ERR`;

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>{QUESTIONS[questionQuery]}</p>
      <InputDate
        data={data}
        isValid={isValid}
        value={value}
        handleValueChange={handleValueChange}
      />
      <p className={isValid[data] ? styles.errmsgValid : styles.errmsgNotvalid}>
        {QUESTIONS[errQuery]}
      </p>
    </div>
  );
};
export default QuestionDate;
