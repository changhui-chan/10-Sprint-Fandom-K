import { useState } from 'react';
import dayjs from 'dayjs';
import Button from '@/shared/ui/Button';
import { IDOL_EX } from '@/shared/constant/QUESTIONS';
import styles from './CreateSupportForm.module.scss';
import Question from './Question';
import QuestionIdol from './QuestionIdol';
import QuestionDate from './QuestionDate';
import useFormStore from './useFormStore';

const CreateSupportForm = () => {
  const [gender, setGender] = useState(`${IDOL_EX.GENDER}`);
  const [group, setGroup] = useState(`${IDOL_EX.GROUP}`);
  const [member, setMember] = useState(`${IDOL_EX.MEMBER}`);
  const [idolId, setIdolId] = useState('');
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

  const { postSupport } = useFormStore();

  const handelIdolIdChange = () => {
    setIdolId(3731); // POST 테스트용: 장원영 id값
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGroup(`${IDOL_EX.GROUP}`);
    setMember(`${IDOL_EX.MEMBER}`);
    setIsValid((prevValues) => ({
      ...prevValues,
      idolId: false,
    }));
  };
  const handleGroupChange = (e) => {
    setGroup(e.target.value);
    setMember(`${IDOL_EX.MEMBER}`);
    setIsValid((prevValues) => ({
      ...prevValues,
      idolId: false,
    }));
  };

  const handleMemberChange = (e) => {
    setMember(e.target.value);
    handelIdolIdChange();
    setIsValid((prevValues) => ({
      ...prevValues,
      idolId: true,
    }));
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

    const formattedDeadline = dayjs(deadline).format();
    const formattedDonation = targetDonation.replaceAll(',', '');

    const result = {
      deadline: `${formattedDeadline}`,
      targetDonation: Number(`${formattedDonation}`),
      subtitle: `${subtitle}`,
      title: `${title}`,
      idolId: Number(`${idolId}`),
    };

    postSupport(result);
  };

  const handleCantSubmit = (e) => {
    e.preventDefault();
    // 제출 막았을때 동작 추가할건지
    console.log('message: Cant Submit (Invalid Input)');
  };

  const handleReset = () => {
    setGender(`${IDOL_EX.GENDER}`);
    setGroup(`${IDOL_EX.GROUP}`);
    setMember(`${IDOL_EX.MEMBER}`);
    setIdolId('');
    setTitle('');
    setSubtitle('');
    setTargetDonation('');
    setDeadline('');
    setIsValid({
      idolId: true,
      title: true,
      subtitle: true,
      deadline: true,
      targetDonation: true,
    });
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
          isValid
          value={{ gender, group, member, idolId }}
          handleValueChange={{
            handleGenderChange,
            handleGroupChange,
            handleMemberChange,
            handelIdolIdChange,
          }}
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
