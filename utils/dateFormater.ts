const dateFormater = (dateTime: string) => {
  const dateString = new Date(dateTime).toLocaleDateString('es-SV');
  const timeString = new Date(dateTime).toLocaleTimeString('es-SV', {
    timeStyle: 'short',
  });

  return { dateString, timeString };
};

export default dateFormater;
