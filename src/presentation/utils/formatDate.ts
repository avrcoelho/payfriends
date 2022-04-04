export const formatDate = (date: string): string => {
  const parsedToDate = new Date(date);
  const dateFormated = parsedToDate.toLocaleDateString('pt-br', {
    dateStyle: 'medium',
  });
  return dateFormated.replace(/\.|de/g, '');
};
