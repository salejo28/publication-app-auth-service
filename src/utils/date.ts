export const formatDate = (d?: string | number | Date) => {
  const date = d ? new Date(d) : new Date();
  const year = date.getFullYear();
  let day = `${date.getDate()}`;
  let month = `${date.getMonth()}`;

  if (day.length < 2) day = `0${day}`;
  if (month.length < 0) month = `0${day}`;

  return [year, month, day].join('/');
};

export const formatHour = (d?: string | number | Date) => {
  const date = d ? new Date(d) : new Date();
  let hour = `${date.getHours()}`;
  let minutes = `${date.getMinutes()}`;
  let seconds = `${date.getSeconds()}`;

  if (hour.length < 2) hour = `0${hour}`;
  if (minutes.length < 2) minutes = `0${minutes}`;
  if (seconds.length < 2) seconds = `0${seconds}`;

  return [hour, minutes, seconds].join(':');
};

export const formatDateWithHour = (d?: string | number | Date) => {
  const date = formatDate(d);
  const hour = formatHour(d);

  return [date, hour].join(' ');
};
