import { useRef } from 'react';
import Modal from '@/shared/ui/modal';
import { useCreditStore } from '@/entities/store/store';
import useModalStore from '@/shared/ui/modal/useModalStore';
import fetchData from '@/shared/api/fetchData';
import { URL_DONATIONS } from '@/shared/constant/url';
import useInputStore from './useInputStore';
import useSupportStore from './useSupportStore';
import useSubmitStore from './useSubmitStore';
import styles from './SupportModal.module.scss';
import LoadingBar from '../loading';

const SupportModal = () => {
  const { credit, payCredit } = useCreditStore();
  const { modals, closeModal } = useModalStore();
  const {
    inputValue,
    errorMessage,
    setInputValue,
    setErrorMessage,
    resetInputValue,
  } = useInputStore();
  const { setSupports } = useSupportStore();
  const { isSubmitting, setIsSubmitting } = useSubmitStore();
  const modalId = useRef('support');

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
    closeModal(modalId.current);
  };

  const handleButtonClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data, error } = await fetchData(
        `${URL_DONATIONS}${modals[modalId.current]?.content?.id}/contribute`,
        '',
        'PUT',
        { amount: inputValue }
      );
      if (!error) {
        setSupports(data);
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
    modals[modalId.current]?.isVisible && (
      <Modal
        headerText="후원하기"
        buttonText="후원하기"
        customModalContainerStyle={styles.modal}
        customModalButtonStyle={styles.button}
        disabled={isSubmitting || !validateInput(inputValue)}
        onClose={handleModalClose}
        buttonClick={handleButtonClick}
        isVisible={modals[modalId.current]?.isVisible}
      >
        <LoadingBar isLoading={isSubmitting} />
        <div className={styles.container}>
          <img
            src={modals[modalId.current]?.content?.image}
            alt="아이돌 사진"
            className={styles.image}
          />
          <h4 className={styles.subtitle}>
            {modals[modalId.current]?.content?.subtitle}
          </h4>
          <h3 className={styles.title}>
            {modals[modalId.current]?.content?.title}
          </h3>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="크레딧 입력"
            className={`${styles.input} ${errorMessage ? styles.errorInput : ''}`}
            onChange={handleInputChange}
            value={inputValue}
          />
          {errorMessage && (
            <span className={styles.errorMessage}>{errorMessage}</span>
          )}
        </div>
      </Modal>
    )
  );
};

export default SupportModal;
