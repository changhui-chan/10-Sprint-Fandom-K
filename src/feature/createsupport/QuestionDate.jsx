import QUESTIONS from '@/shared/constant/QUESTIONS';
import InputDate from './InputDate';
import styles from './Question.module.scss';

const QuestionDate = ({ data, value, handleValueChange }) => {
  const questionQuery = data.toUpperCase();

  return (
    <div className={styles.question}>
      <p className={styles.question_text}>{QUESTIONS[questionQuery]}</p>
      <InputDate
        data={data}
        value={value}
        handleValueChange={handleValueChange}
      />
    </div>
  );
};
export default QuestionDate;
