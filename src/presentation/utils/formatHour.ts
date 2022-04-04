export const formatHour = (date: string): string => {
  const parsedToDate = new Date(date);
  return parsedToDate.toLocaleTimeString('pt-br', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
