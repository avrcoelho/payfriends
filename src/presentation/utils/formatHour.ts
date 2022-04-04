export const formatHour = (date: string): string => {
  const parsedToDate = new Date(`${date} 00:00:00`);
  return parsedToDate.toLocaleTimeString('pt-br', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
