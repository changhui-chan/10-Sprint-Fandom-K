import styles from './index.module.scss';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import Button from '../Button';
import useModalStore from './useModalStore';

const Modal = ({
  headerText = '',
  footerElement = null,
  children = null,
  customModalContainerStyle = '',
  customModalContentStyle = '',
  customModalButtonStyle = '',
  buttonText = '확인',
  disabled = false,
  onClose = () => {},
  buttonClick = () => {},
}) => {
  const { isVisible } = useModalStore();

  return (
    <div>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={`${styles.container} ${customModalContainerStyle}`}>
            <ModalHeader headerText={headerText} onClose={onClose} />
            <div className={`${styles.content} ${customModalContentStyle}`}>
              {children}
            </div>
            <Button
              onClick={buttonClick}
              className={customModalButtonStyle}
              disabled={disabled}
            >
              {buttonText}
            </Button>
            <ModalFooter footerElement={footerElement} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
