const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year.slice(-2)}`;
}

function formatRaceTime(time) {
  let parts = time.split(':');

  // Remove leading '0' from hours if hours are less than 10 but more than 0.
  if (parts[0].charAt(0) === '0' && parts[0] !== '00') {
    parts[0] = parts[0].substring(1);
  }

  // If hours is '00', remove it.
  if (parts[0] === '00') {
    parts.shift();
  }

  return parts.join(':');
}

export { formatDate, formatRaceTime };


