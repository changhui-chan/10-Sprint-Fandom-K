import CloseIcon from '@/assets/images/btn-delete.svg';
import styles from './ModalHeader.module.scss';
import useModalStore from './useModalStore';

const ModalHeader = ({ headerText }) => {
  const { removeElement } = useModalStore();

  return (
    <div className={styles.container}>
      <p>{headerText}</p>
      <button type="button" onClick={removeElement}>
        <img src={CloseIcon} alt="close" />
      </button>
    </div>
  );
};
export default ModalHeader;
