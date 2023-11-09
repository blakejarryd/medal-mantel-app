const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const rankRaces = (data) => {

  ['5k', '10k', 'Half Marathon', 'Marathon'].forEach(eventType => {
    data
      .filter(race => race.event === eventType)
      .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
      .forEach((race, index) => {
        race.rank = index + 1; 
      });
  });

  data
    .filter(race => race.event === 'Ultra Marathon' || race.event === 'Other')
    .forEach(race => {
      race.rank = null;
    });

  return data;
};

export const formatRaceDistance = (raceDistance, distanceUnit, formatString = true) => {
  let convertedDistance = parseFloat(raceDistance);
  
  if (distanceUnit === 'mi') {
    convertedDistance = (convertedDistance * 0.621371).toFixed(1);
  } else {
    convertedDistance = convertedDistance.toFixed(1);
  }
  
  if (formatString) {
    return convertedDistance.replace(/\.0$/, '') + distanceUnit;
  } else {
    return parseFloat(convertedDistance);
  }
};




