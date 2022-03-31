export const formatDate = (timestamp: number): string => {
  const parsedToDate = new Date(timestamp);
  return parsedToDate.toLocaleDateString('pt-br', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
