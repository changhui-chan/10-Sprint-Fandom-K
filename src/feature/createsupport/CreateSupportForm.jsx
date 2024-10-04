import { useState } from 'react';
import dayjs from 'dayjs';
import Button from '@/shared/ui/Button';
import styles from './CreateSupportForm.module.scss';
import Question from './Question';
import QuestionIdol from './QuestionIdol';
import QuestionDate from './QuestionDate';

const CreateSupportForm = () => {
  const [gender, setGender] = useState('');
  const [group, setGroup] = useState('');
  const [member, setMember] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [targetDonation, setTargetDonation] = useState(0);
  const [isValid, setIsValid] = useState({
    idolId: true,
    title: true,
    subtitle: true,
    deadline: true,
    targetDonation: true,
  });

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };
  const handleMemberChange = (e) => {
    setMember(e.target.value);
  };

  const handleTitleChange = (e) => {
    if (e.target.value === '') {
      setTitle(e.target.value);
      setIsValid((prevValues) => ({
        ...prevValues,
        title: false,
      }));
    } else {
      setTitle(e.target.value);
      setIsValid((prevValues) => ({
        ...prevValues,
        title: true,
      }));
    }
  };

  const handleSubtitleChange = (e) => {
    if (e.target.value === '') {
      setSubtitle(e.target.value);
      setIsValid((prevValues) => ({
        ...prevValues,
        subtitle: false,
      }));
    } else {
      setSubtitle(e.target.value);
      setIsValid((prevValues) => ({
        ...prevValues,
        subtitle: true,
      }));
    }
  };

  const handleDeadlineChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);

    // dayjs 객체를 비교, 오늘 날짜보다 뒤면 true, 아니면 flase 반환
    const isValidDate = dayjs().isBefore(value, 'day');

    if (isValidDate) {
      setDeadline(dateString);
      setIsValid((prevValues) => ({
        ...prevValues,
        deadline: true,
      }));
    } else {
      setDeadline(dateString);
      setIsValid((prevValues) => ({
        ...prevValues,
        deadline: false,
      }));
    }
  };

  const handleTargetDonationChange = (e) => {
    const target = e.target.value;
    const i = Number(target.replaceAll(',', ''));

    if (Number.isNaN(i)) {
      setTargetDonation(0);
      setIsValid((prevValues) => ({
        ...prevValues,
        targetDonation: false,
      }));
    } else {
      setTargetDonation(i.toLocaleString('ko-KR'));
      setIsValid((prevValues) => ({
        ...prevValues,
        targetDonation: true,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 3개입력 조합해서 idol id 찾기
    const idolId = 1111;

    const result = {
      deadline: { deadline },
      targetDonation: { targetDonation },
      subtitle: { subtitle },
      title: { title },
      idolId: { idolId },
    };
    // 변경 예정
    // POST 보내기, 통합 fetch 이용
    console.log(result);
  };

  const handleCantSubmit = (e) => {
    e.preventDefault();
    // 제출 막았을때 동작 추가할건지
    console.log('message: Cant Submit (Invalid Input)');
  };

  const handleReset = () => {
    setGender('');
    setGroup('');
    setMember('');
    setTitle('');
    setSubtitle('');
    setTargetDonation('');
    setDeadline('');
  };

  return (
    <form
      className={styles.form}
      onSubmit={
        Object.values(isValid).every((el) => el === true)
          ? handleSubmit
          : handleCantSubmit
      }
    >
      <div className={styles.questions}>
        <QuestionIdol
          data="idol"
          value={[gender, group, member]}
          handleValueChange={[
            handleGenderChange,
            handleGroupChange,
            handleMemberChange,
          ]}
        />
        <Question
          data="title"
          isValid={isValid}
          value={title}
          handleValueChange={handleTitleChange}
        />
        <Question
          data="subtitle"
          isValid={isValid}
          value={subtitle}
          handleValueChange={handleSubtitleChange}
        />
        <QuestionDate
          data="deadline"
          isValid={isValid}
          value={deadline}
          handleValueChange={handleDeadlineChange}
        />
        <Question
          data="targetDonation"
          isValid={isValid}
          value={targetDonation}
          handleValueChange={handleTargetDonationChange}
        />
      </div>
      <div className={styles.footer}>
        <Button className={styles.reset} onClick={handleReset}>
          폼 지우기
        </Button>
        <Button className={styles.submit} type="submit">
          제출하기
        </Button>
      </div>
    </form>
  );
};

export default CreateSupportForm;
