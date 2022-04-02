export const formatHour = (timestamp: number): string => {
  const parsedToDate = new Date(timestamp);
  return parsedToDate.toLocaleTimeString('pt-br', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
