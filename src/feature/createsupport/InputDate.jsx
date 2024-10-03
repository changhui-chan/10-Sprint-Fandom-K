import { DatePicker } from 'antd';
import QUESTIONS from '@/shared/constant/QUESTIONS';
import styles from './InputDate.module.scss';

const InputDate = ({ data, handleValueChange }) => {
  const exampleQuery = `${data.toUpperCase()}_EX`;

  return (
    <DatePicker
      showTime
      className={styles.field}
      placeholder={QUESTIONS[exampleQuery]}
      onChange={handleValueChange}
    />
  );
};

export default InputDate;
