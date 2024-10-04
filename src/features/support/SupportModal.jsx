import Modal from '@/shared/ui/modal';
import { useCreditStore } from '@/entities/store/store';
import useModalStore from '@/shared/ui/modal/useModalStore';
import useInputStore from './useInputStore';
import useSupportStore from './useSupportStore';
import useSubmitStore from './useSubmitStore';
import styles from './SupportModal.module.scss';

const SupportModal = () => {
  const { credit, payCredit } = useCreditStore();
  const { modalContent, removeElement } = useModalStore();
  const {
    inputValue,
    errorMessage,
    setInputValue,
    setErrorMessage,
    resetInputValue,
  } = useInputStore();
  const { error, contributeSupport } = useSupportStore();
  const { isSubmitting, setIsSubmitting } = useSubmitStore();

  const handleInputChange = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/\D/g, '');
    setInputValue(filteredValue, credit);
  };

  const validateInput = (value) => {
    if (value.trim() === '') return false;
    if (value <= credit) return true;

    return false;
  };

  const handleModalClose = () => {
    resetInputValue();
    removeElement();
  };

  const handleButtonClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await contributeSupport(modalContent.id, inputValue);
      if (!error) {
        payCredit(Number(inputValue));
        handleModalClose();
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      headerText="후원하기"
      buttonText="후원하기"
      customModalContainerStyle={styles.modal}
      customModalButtonStyle={styles.button}
      disabled={isSubmitting || !validateInput(inputValue)}
      onClose={handleModalClose}
      buttonClick={handleButtonClick}
    >
      <div className={styles.container}>
        <img
          src={modalContent?.image}
          alt="아이돌 사진"
          className={styles.image}
        />
        <h4 className={styles.subtitle}>{modalContent?.subtitle}</h4>
        <h3 className={styles.title}>{modalContent?.title}</h3>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="크레딧 입력"
          className={styles.input}
          onChange={handleInputChange}
          value={inputValue}
        />
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    </Modal>
  );
};

export default SupportModal;
