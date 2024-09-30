import { useState } from 'react';
import Button from '@/shared/ui/Button';
import styles from './CreateSupportForm.module.scss';
import Question from './Question';
import QuestionIdol from './QuestionIdol';

const CreateSupportForm = () => {
  const [gender, setGender] = useState('');
  const [group, setGroup] = useState('');
  const [member, setMember] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [targetDonation, setTargetDonation] = useState('');

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
    setTitle(e.target.value);
  };
  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };
  const handleDeadlineChange = (e) => {
    // 컴포넌트 적용x 버전, 나눠서 커밋할 예쩡
    setDeadline(e.target.value);
  };
  const handleTargetDonationChange = (e) => {
    setTargetDonation(e.target.value);
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
    <form className={styles.form} onSubmit={handleSubmit}>
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
          value={title}
          handleValueChange={handleTitleChange}
        />
        <Question
          data="subtitle"
          value={subtitle}
          handleValueChange={handleSubtitleChange}
        />
        <Question
          data="deadline"
          value={deadline}
          handleValueChange={handleDeadlineChange}
        />
        <Question
          data="targetdonation"
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
