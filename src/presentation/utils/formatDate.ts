export const formatDate = (timestamp: number): string => {
  const parsedToDate = new Date(timestamp);
  const dateFormated = parsedToDate.toLocaleDateString('pt-br', {
    dateStyle: 'medium',
  });
  return dateFormated.replace(/\.|de/g, '');
};
