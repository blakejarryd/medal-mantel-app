export function paceToSeconds(pace) {
  const parts = pace.split(':');
  if (parts.length === 2) {
    const [minutes, seconds] = parts.map(Number);
    if (!isNaN(minutes) && !isNaN(seconds)) {
      return minutes * 60 + seconds;
    }
  }
  return 0; // Return 0 or some default value if the input is incorrect
}

export function secondsToPace(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

export function timeToSeconds (hours, minutes, seconds) {
  const parsedHours = hours ? parseInt(hours) : 0;
  const parsedMinutes = minutes ? parseInt(minutes) : 0;
  const parsedSeconds = seconds ? parseInt(seconds) : 0;

  return parsedHours * 3600 + parsedMinutes * 60 + parsedSeconds;
};

