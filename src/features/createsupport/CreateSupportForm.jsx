import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@/shared/ui/Button';
import { IDOLID_EX } from '@/shared/constant/QUESTIONS';
import styles from './CreateSupportForm.module.scss';
import Question from './Question';
import QuestionIdol from './QuestionIdol';
import QuestionDate from './QuestionDate';
import useFormStore from './useFormStore';

const CreateSupportForm = () => {
  const [gender, setGender] = useState(`${IDOLID_EX.GENDER}`);
  const [group, setGroup] = useState(`${IDOLID_EX.GROUP}`);
  const [member, setMember] = useState(`${IDOLID_EX.MEMBER}`);
  const [idolId, setIdolId] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [targetDonation, setTargetDonation] = useState('0');
  const [isValid, setIsValid] = useState({
    idolId: true,
    title: true,
    subtitle: true,
    deadline: true,
    targetDonation: true,
  });

  const navigate = useNavigate();

  const { newId, getIdolId, postSupport } = useFormStore();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGroup(`${IDOLID_EX.GROUP}`);
    setMember(`${IDOLID_EX.MEMBER}`);
    setIsValid((prevValues) => ({
      ...prevValues,
      idolId: false,
    }));
  };
  const handleGroupChange = (e) => {
    setGroup(e.target.value);
    setMember(`${IDOLID_EX.MEMBER}`);
    setIsValid((prevValues) => ({
      ...prevValues,
      idolId: false,
    }));
  };

  const handleMemberChange = (e) => {
    setMember(e.target.value);

    setIsValid((prevValues) => ({
      ...prevValues,
      idolId: true,
    }));
  };

  useEffect(() => {
    if (
      gender !== IDOLID_EX.GENDER &&
      group !== IDOLID_EX.GROUP &&
      member !== IDOLID_EX.MEMBER
    ) {
      getIdolId(group, member);
      setIdolId(newId);
    }
  }, [gender, group, member, getIdolId, newId]);

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

  const doSubmit = () => {
    const formattedDeadline = dayjs(deadline).format();
    const formattedDonation = targetDonation.replaceAll(',', '');

    const result = {
      deadline: `${formattedDeadline}`,
      targetDonation: Number(`${formattedDonation}`),
      subtitle: `${subtitle}`,
      title: `${title}`,
      idolId: Number(`${idolId}`),
    };
    // console.log('post: ', result);
    postSupport(result);
    navigate('/support');
  };

  const doNotSubmit = () => {
    // console.log('message: Cant Submit (Invalid Input)');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // idol id : 2, 3번째 드롭다운 선택중에 invalid 스타일로 표시되는 문제로 일단 제외
    if (title === '') {
      setIsValid((prevValues) => ({
        ...prevValues,
        title: false,
      }));
    } else if (subtitle === '') {
      setIsValid((prevValues) => ({
        ...prevValues,
        subtitle: false,
      }));
    } else if (deadline === '') {
      setIsValid((prevValues) => ({
        ...prevValues,
        deadline: false,
      }));
    } else if (targetDonation === '0') {
      setIsValid((prevValues) => ({
        ...prevValues,
        targetDonation: false,
      }));
    } else {
      if (Object.values(isValid).every((el) => el === true)) {
        doSubmit();
      }
      doNotSubmit();
    }
  };

  const handleReset = () => {
    setGender(`${IDOLID_EX.GENDER}`);
    setGroup(`${IDOLID_EX.GROUP}`);
    setMember(`${IDOLID_EX.MEMBER}`);
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.questions}>
        <QuestionIdol
          data="idolId"
          value={{ gender, group, member }}
          handleValueChange={{
            handleGenderChange,
            handleGroupChange,
            handleMemberChange,
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
