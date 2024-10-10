import CreditIcon from '@/assets/images/credit.svg';
import { useState, useRef } from 'react';
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
  const { modals, openModal, closeModal } = useModalStore();
  const [selected, setSelected] = useState(null);
  const modalId = useRef('credit');

  const onClick = () => {
    setChargeModalVisibility(true);
    openModal(modalId.current);
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
    closeModal(modalId.current);
  };

  const onClose = () => {
    setChargeModalVisibility(false);
    setSelected(null);
    closeModal(modalId.current);
  };

  return (
    <>
      <div className={`${styles.container} ${customStyle}`}>
        <button onClick={onClick} type="button">
          <img
            src={CreditIcon}
            alt="크레딧 아이콘"
            className={styles.creditIcon}
          />
          <span className={styles.credit}>{credit.toLocaleString()}</span>
        </button>
      </div>
      {modals[modalId.current]?.isVisible && (
        <Modal
          headerText="크레딧 충전"
          onClose={onClose}
          buttonText={
            <div className={styles.buttonContainer}>
              <img src={CreditIcon} alt="크레딧아이콘" />
              충전하기
            </div>
          }
          customModalContainerStyle={styles.customModalContainerStyle}
          customModalButtonStyle={styles.customModalButtonStyle}
          buttonClick={buttonClick}
          isVisible={modals[modalId.current]?.isVisible}
        >
          <div className={styles.modal}>
            {[100, 500, 1000].map((value, index) => (
              <button
                key={value}
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
      )}
    </>
  );
};
export default Credit;
