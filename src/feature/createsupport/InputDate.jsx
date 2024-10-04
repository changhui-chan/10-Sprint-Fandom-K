import { DatePicker } from 'antd';
import QUESTIONS from '@/shared/constant/QUESTIONS';
import styles from './InputDate.module.scss';

const InputDate = ({ data, isValid, value, handleValueChange }) => {
  const exampleQuery = `${data.toUpperCase()}_EX`;

  return (
    <DatePicker
      showTime
      className={
        isValid[data]
          ? `${styles.field}`
          : `${styles.field} ${styles.field_notvalid}`
      }
      placeholder={QUESTIONS[exampleQuery]}
      onChange={handleValueChange}
    />
  );
};

export default InputDate;
