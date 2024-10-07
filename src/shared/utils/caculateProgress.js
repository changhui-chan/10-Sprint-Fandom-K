const caculateProgress = (current, total) => {
  const progress = (current / total) * 100;

  return Math.floor(progress);
};

export default caculateProgress;
