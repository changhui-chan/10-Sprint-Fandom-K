import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import Button from '../Button';

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
  isVisible = false,
  customHeader = null,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buttonClick();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOutsideClick}
      onKeyUp={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div
        ref={modalRef}
        className={`${styles.container} ${isVisible ? styles.visible : styles.hidden} ${customModalContainerStyle}`}
      >
        {customHeader ||
          (headerText && (
            <ModalHeader headerText={headerText} onClose={onClose} />
          ))}
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
  );
};

export default Modal;
