import CloseIcon from '@/assets/images/btn-delete.svg';
import styles from './ModalHeader.module.scss';

const ModalHeader = ({ headerText }) => {
  return (
    <div className={styles.container}>
      <p>{headerText}</p>
      <img src={CloseIcon} alt="close" />
    </div>
  );
};
export default ModalHeader;
