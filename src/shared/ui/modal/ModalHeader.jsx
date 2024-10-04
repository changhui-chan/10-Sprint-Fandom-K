import CloseIcon from '@/assets/images/btn-delete.svg';
import styles from './ModalHeader.module.scss';

const ModalHeader = ({ headerText, onClose }) => {
  return (
    <div className={styles.container}>
      <p>{headerText}</p>
      <button type="button" onClick={onClose}>
        <img src={CloseIcon} alt="close" />
      </button>
    </div>
  );
};
export default ModalHeader;
