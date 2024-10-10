import { useRef } from 'react';
import Modal from '@/shared/ui/modal';
import creditIcon from '@/assets/images/ic-credit.svg';
import useModalStore from '@/shared/ui/modal/useModalStore';
import styles from './AlertModal.module.scss';

const AlertModal = () => {
  const { modals, closeModal } = useModalStore();
  const modalId = useRef('alert');

  return (
    modals[modalId.current]?.isVisible && (
      <Modal
        customModalContainerStyle={styles.modal}
        customModalButtonStyle={styles.button}
        onClose={() => closeModal(modalId.current)}
        buttonClick={() => closeModal(modalId.current)}
        isVisible={modals[modalId.current]?.isVisible}
      >
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src={creditIcon} alt="크레딧 아이콘" />
          </div>
          <p>
            앗! 투표하기 위한 <strong>크레딧</strong>이 부족해요
          </p>
        </div>
      </Modal>
    )
  );
};

export default AlertModal;
