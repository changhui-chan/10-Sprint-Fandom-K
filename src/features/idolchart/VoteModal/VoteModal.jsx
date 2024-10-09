import { useState } from 'react';
import Modal from '@/shared/ui/modal/index';
import useModalStore from '@/shared/ui/modal/useModalStore';
import { useCreditStore } from '@/entities/store/store';
import AlertModal from '@/features/credit/AlertModal';
import useVoteStore from './useVoteStore';
import ModalListItem from './ModalList';
import styles from './VoteModal.module.scss';

const VoteModal = ({ items = [], onClose, gender }) => {
  const contributeVote = useVoteStore((state) => state.contributeVote);
  const { removeElement } = useModalStore();
  const { credit, payCredit } = useCreditStore();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedIdolId, setSelectedIdolId] = useState(null);
  const handleClick = async () => {
    const voteCost = 1000;

    if (selectedIdolId) {
      if (credit < voteCost) {
        setShowAlert(true);
        return;
      }

      await contributeVote(Number(selectedIdolId));
      await payCredit(voteCost);
      removeElement();
      onClose();
    }
  };

  const handleModalClose = () => {
    removeElement();
    onClose();
  };

  const handleButtonClick = async () => {
    await handleClick();
  };

  const handleSelectIdol = (id) => {
    setSelectedIdolId(id);
  };

  return (
    <>
      <Modal
        headerText={
          <div className={styles.headerText}>
            {gender === 'female' ? '이달의 여자 아이돌' : '이달의 남자 아이돌'}
          </div>
        }
        onClose={handleModalClose}
        customModalContainerStyle={styles.voteModal}
        customModalButtonStyle={styles.voteButton}
        buttonText="투표하기"
        buttonClick={handleButtonClick}
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

      {showAlert && <AlertModal onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default VoteModal;
