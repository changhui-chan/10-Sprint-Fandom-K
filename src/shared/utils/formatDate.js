export const formatDate = (date) =>
  new Date(date)
    .toLocaleDateString('ko-kr', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '');

export const getRamainingDays = (date) => {
  const today = new Date('2024-10-12');
  const targetDate = new Date(date);

  const diffMs = targetDate - today;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays === 0 ? 'D-Day' : `D-${diffDays}`;
};
