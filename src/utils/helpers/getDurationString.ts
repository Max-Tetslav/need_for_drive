const getDurationString = (dateFrom: number, dateTo: number): string => {
  const duration = dateTo - dateFrom;
  const minutes = duration / 1000 / 60;
  const hours = minutes / 60;

  const minutesNum = minutes % 60;
  const hoursNum = Math.floor(hours % 24);
  const daysNum = Math.floor(hours / 24);

  const minutesText = minutesNum ? `${minutesNum}мин` : '';
  const hoursText = hoursNum ? `${hoursNum}ч` : '';
  const daysText = daysNum ? `${daysNum}д` : '';

  return `${daysText} ${hoursText} ${minutesText}`;
};

export default getDurationString;
