import Modal from '@/shared/ui/modal/index';
import useModalStore from '@/shared/ui/modal/useModalStore';
import useVoteStore from './useVoteStore';
import ModalListItem from './ModalList';
import styles from './VoteModal.module.scss';
import useSelectedIdolStore from './useSelectedIdolStore';

const VoteModal = ({ items = [], onClose }) => {
  const selectedIdolId = useSelectedIdolStore((state) => state.selectedIdolId);
  const contributeVote = useVoteStore((state) => state.contributeVote);
  const { removeElement } = useModalStore();

  const handleClick = async () => {
    if (selectedIdolId) {
      await contributeVote(Number(selectedIdolId));
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

  return (
    <Modal
      headerText="아이돌 선택"
      onClose={handleModalClose}
      customModalContainerStyle={styles.modal}
      customModalButtonStyle={styles.button}
      buttonText="투표하기"
      buttonClick={handleButtonClick}
    >
      <ul className={styles.modalList}>
        {items.map((item) => (
          <li key={item.id}>
            <ModalListItem item={item} />
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default VoteModal;
