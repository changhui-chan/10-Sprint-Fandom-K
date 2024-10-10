import styles from './index.module.scss';

const LoadingBar = ({ isLoading }) => {
  return (
    isLoading && (
      <div className={styles.container}>
        <div className={styles.loadingBar}></div>
      </div>
    )
  );
};

export default LoadingBar;
