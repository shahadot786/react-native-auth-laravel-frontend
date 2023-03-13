export const CurrentDataTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const currentDateTimeString = `${year}${month < 10 ? '0' : ''}${month}${
    day < 10 ? '0' : ''
  }${day}${hours < 10 ? '0' : ''}${hours}${minutes < 10 ? '0' : ''}${minutes}${
    seconds < 10 ? '0' : ''
  }${seconds}`;
  return currentDateTimeString;
};
