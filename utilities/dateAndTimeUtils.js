const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year.slice(-2)}`;
}

function formatRaceTime(time) {
  const parts = time.split(':');

  // If hours is '00' or just '0', remove it.
  if (parts[0] === '00' || parts[0] === '0') {
    parts.shift();
  }

  return parts.join(':');
}

export { formatDate, formatRaceTime };


