import Modal from '@/shared/ui/modal';
import creditIcon from '@/assets/images/ic-credit.svg';
import useModalStore from '@/shared/ui/modal/useModalStore';
import styles from './index.module.scss';

const LackModal = () => {
  const { removeElement } = useModalStore();

  return (
    <Modal
      customModalContainerStyle={styles.modal}
      customModalButtonStyle={styles.button}
      onClose={removeElement}
      buttonClick={removeElement}
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
  );
};

export default LackModal;
