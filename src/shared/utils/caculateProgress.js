const caculateProgress = (current, total) => {
  const progress = Math.min((current / total) * 100, 100);

  return Math.floor(progress);
};

export default caculateProgress;
