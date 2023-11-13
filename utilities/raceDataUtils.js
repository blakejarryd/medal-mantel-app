const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const rankRaces = (data, personalBests) => {
  const PBdistances = Object.values(personalBests);
  PBdistances.forEach(distance => {
    data
      .filter(race => race.distance === distance)
      .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
      .forEach((race, index) => {
        race.rank = index + 1; 
      });
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




