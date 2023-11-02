import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RaceIcon = ({ rank, event }) => {
  let icon = "run"; // Default icon for non-ranked
  let color = '#A9A9A9'; // Default color for non-ranked

  // If it's an ultra marathon and not top 3
  if (event === 'Ultra Marathon') {
    icon = "terrain";
  }

  switch (rank) {
    case 1:
      icon = "medal";
      color = "#FFD700"; // gold
      break;
    case 2:
      icon = "medal";
      color = "#C0C0C0"; // silver
      break;
    case 3:
      icon = "medal";
      color = "#CD7F32"; // bronze
      break;
  }

  return <MaterialCommunityIcons name={icon} size={36} color={color} />;
};

export default RaceIcon;
