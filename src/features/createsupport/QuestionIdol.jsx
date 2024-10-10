import { useEffect } from 'react';
import { QUESTIONS, IDOLID_EX } from '@/shared/constant/QUESTIONS';
import styles from './Question.module.scss';
import Dropdown from './Dropdown';
import useFormStore from './useFormStore';
import processIdols from './processIdols';

const QuestionIdol = ({ data, value, handleValueChange }) => {
  const { gender, group, member } = value;
  const { handleGenderChange, handleGroupChange, handleMemberChange } =
    handleValueChange;

  const questionQuery = data.toUpperCase();

  const { idols, isLoading, error, fetchIdols } = useFormStore();

  useEffect(() => {
    fetchIdols();
  }, [fetchIdols]);

  // console.log('fetchIdols 완료: ', idols);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { genderList, groupList, memberList } = processIdols(idols);

  // console.log('데이터 프로세싱 완료');
  // console.log('genderList: ', genderList);
  // console.log('groupList: ', groupList);
  // console.log('memberList: ', memberList);

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>{QUESTIONS[questionQuery]}</p>
      <div className={styles.idolquestion}>
        <Dropdown
          className={styles.dropdown}
          list={genderList}
          selected={gender}
          handleSelect={handleGenderChange}
          initial={IDOLID_EX.GENDER}
        />
        <Dropdown
          className={styles.dropdown}
          list={groupList[gender]}
          selected={group}
          handleSelect={handleGroupChange}
          initial={IDOLID_EX.GROUP}
        />
        <Dropdown
          className={styles.dropdown}
          list={memberList[group]}
          selected={member}
          handleSelect={handleMemberChange}
          initial={IDOLID_EX.MEMBER}
        />
      </div>
    </div>
  );
};
export default QuestionIdol;
