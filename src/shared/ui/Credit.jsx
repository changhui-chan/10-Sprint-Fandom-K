import CreditIcon from '@/assets/images/credit.svg';
import { useEffect, useState } from 'react';
import styles from './Credit.module.scss';
import {
  useChargeModalVisibilityStore,
  useCreditStore,
} from '../../entities/store/store';
import Modal from './modal';
import useModalStore from './modal/useModalStore';

const Credit = ({ customStyle }) => {
  const { credit, addCredit } = useCreditStore();
  const { setChargeModalVisibility } = useChargeModalVisibilityStore();
  const { openModal, removeElement } = useModalStore();
  const [selected, setSelected] = useState(null);

  const onClick = () => {
    setChargeModalVisibility(true);
    openModal();
  };

  const onRadioButtonClick = (index) => {
    setSelected(index);
  };

  const buttonClick = () => {
    if (selected === 0) {
      addCredit(100);
    }

    if (selected === 1) {
      addCredit(500);
    }

    if (selected === 2) {
      addCredit(1000);
    }

    setChargeModalVisibility(false);
    setSelected(null);
    removeElement();
  };

  const onClose = () => {
    setChargeModalVisibility(false);
    setSelected(null);
    removeElement();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setChargeModalVisibility(false);
        setSelected(null);
        removeElement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setChargeModalVisibility, removeElement]);

  return (
    <>
      <div className={`${styles.container} ${customStyle}`}>
        <button onClick={onClick} type="button">
          <img
            src={CreditIcon}
            alt="크레딧 아이콘"
            className={styles.creditIcon}
          />
          <span className={styles.credit}>{credit}</span>
        </button>
      </div>
      <Modal
        headerText="크레딧 충전"
        onClose={onClose}
        buttonText="충전하기"
        customModalContainerStyle={styles.customModalContainerStyle}
        buttonClick={buttonClick}
      >
        <div className={styles.modal}>
          {[100, 500, 1000].map((value, index) => (
            <button
              type="button"
              className={styles.radioButton}
              onClick={() => onRadioButtonClick(index)}
            >
              <img
                src={CreditIcon}
                alt="크레딧 아이콘"
                className={styles.creditIcon}
              />
              <p>{value}</p>
              <div
                className={`
                ${styles.radio} 
                ${selected === index ? styles.selected : ''}`}
              />
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};
export default Credit;
