import styles from './index.module.scss';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import Button from '../Button';
import useModalStore from './useModalStore';

const Modal = ({
  headerText = '',
  footerElement = null,
  children = null,
  sectionMarginTop = '24px',
  sectionMarginBottom = '24px',
  buttonText = '확인',
  buttonClick = () => {},
}) => {
  const { isVisible } = useModalStore();

  return (
    <div>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <ModalHeader headerText={headerText} />
            <div
              style={{
                marginTop: sectionMarginTop,
                marginBottom: sectionMarginBottom,
              }}
              className={styles.content}
            >
              {children}
            </div>
            <Button onClick={buttonClick}>{buttonText}</Button>
            <ModalFooter footerElement={footerElement} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
