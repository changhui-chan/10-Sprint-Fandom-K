import Button from '@/shared/ui/Button';
import style from './IdolMore.module.scss';

const LoadMoreComponent = ({ onLoadMore, pageSize }) => {
  const handleLoadMore = async () => {
    try {
      await onLoadMore(pageSize + 10);
    } catch (error) {
      console.error('실패:', error);
    }
  };

  return (
    <div className={style.mButton}>
      <Button onClick={handleLoadMore}>더보기</Button>
    </div>
  );
};

export default LoadMoreComponent;
