import styles from './ModalFooter.module.scss';

const ModalFooter = ({ footerElement }) => {
  return <div className={styles.container}>{footerElement}</div>;
};

export default ModalFooter;
