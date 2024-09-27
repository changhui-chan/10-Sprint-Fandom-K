import styles from './index.module.scss';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import Button from '../Button';

const Modal = ({
  children = null,
  buttonText = '확인',
  buttonClick = () => {},
}) => {
  return (
    <div className={styles.container}>
      <ModalHeader />
      {children}
      <Button onClick={buttonClick}>{buttonText}</Button>
      <ModalFooter />
    </div>
  );
};

export default Modal;
