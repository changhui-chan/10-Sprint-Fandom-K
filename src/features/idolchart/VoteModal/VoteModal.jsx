import { useState, useRef } from 'react';
import Modal from '@/shared/ui/modal/index';
import useModalStore from '@/shared/ui/modal/useModalStore';
import { useCreditStore } from '@/entities/store/store';
import CloseIcon from '@/assets/images/btn-pagination-left.svg';
import useVoteStore from './useVoteStore';
import ModalListItem from './ModalList';
import styles from './VoteModal.module.scss';

const VoteModal = ({ items = [], onClose, gender }) => {
  const contributeVote = useVoteStore((state) => state.contributeVote);
  const { modals, closeModal } = useModalStore();
  const { payCredit } = useCreditStore();
  const [selectedIdolId, setSelectedIdolId] = useState(null);
  const modalId = useRef('chart');

  const handleClick = async () => {
    const voteCost = 1000;

    if (selectedIdolId) {
      await contributeVote(Number(selectedIdolId));
      await payCredit(voteCost);
      closeModal(modalId.current);
      onClose();
      setSelectedIdolId(null);
    }
  };

  const handleModalClose = () => {
    setSelectedIdolId(null);
    closeModal(modalId.current);
    onClose();
  };

  const handleButtonClick = async () => {
    await handleClick();
  };

  const handleSelectIdol = (id) => {
    setSelectedIdolId(id);
  };

  const customHeader = (
    <div className={styles.customHeader}>
      <button onClick={handleModalClose} className={styles.closeButton}>
        <img src={CloseIcon} alt="Close" className={styles.closeButtonIcon} />
      </button>
      <span className={styles.headerText}>
        {gender === 'female' ? '이달의 여자 아이돌' : '이달의 남자 아이돌'}
      </span>
    </div>
  );

  return (
    modals[modalId.current]?.isVisible && (
      <Modal
        headerText={
          gender === 'female' ? '이달의 여자 아이돌' : '이달의 남자 아이돌'
        }
        customHeader={customHeader}
        onClose={handleModalClose}
        customModalContainerStyle={styles.voteModal}
        customModalContentStyle={styles.customModalContentStyle}
        customModalButtonStyle={styles.voteButton}
        buttonText="투표하기"
        buttonClick={handleButtonClick}
        isVisible={modals[modalId.current]?.isVisible}
        footerElement={
          <p className={styles.footerText}>
            투표하는 데&nbsp;
            <span className={styles.alertText}>1000 크레딧</span>이 소모됩니다.
          </p>
        }
      >
        <ul className={styles.modalList}>
          {items.map((item) => (
            <li key={item.id}>
              <ModalListItem
                item={item}
                onClick={() => handleSelectIdol(item.id)}
                isSelected={selectedIdolId === item.id}
              />
            </li>
          ))}
        </ul>
      </Modal>
    )
  );
};

export default VoteModal;
