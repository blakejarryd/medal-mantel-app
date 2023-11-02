const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const rankRaces = (data) => {
  // Calculate ranks for valid events
  ['5k', '10k', 'Half Marathon', 'Marathon'].forEach(eventType => {
    data
      .filter(race => race.event === eventType)
      .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
      .forEach((race, index) => {
        race.rank = index + 1; // 1-based ranking
      });
  });

  // For events 'Ultra Marathon' and 'other', set rank to null
  data
    .filter(race => race.event === 'Ultra Marathon' || race.event === 'Other')
    .forEach(race => {
      race.rank = null;
    });

  return data;
};