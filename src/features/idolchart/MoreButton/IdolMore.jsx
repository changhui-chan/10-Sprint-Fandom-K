import Button from '@/shared/ui/Button';
import style from './IdolMore.module.scss';

const LoadMoreComponent = ({ onLoadMore }) => {
  const handleLoadMore = async () => {
    try {
      await onLoadMore();
    } catch (error) {
      console.error('실패:', error);
    }
  };

  return (
    <div className={style.buttonContainer}>
      <Button onClick={handleLoadMore} className={style.mButton}>
        더보기
      </Button>
    </div>
  );
};

export default LoadMoreComponent;
