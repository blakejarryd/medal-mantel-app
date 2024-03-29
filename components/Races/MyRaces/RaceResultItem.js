import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MedalIcon from '../../SharedComponents/MedalIcon';
import { formatDate, formatRaceTime } from '../../../utilities/dateAndTimeUtils';
import { formatRaceDistance } from '../../../utilities/raceDataUtils'; 
import { RaceDataContext } from '../../../services/RaceDataProvider';
import theme from '../../../theme';

const RaceResultItem = ({ raceData, onPress }) => {
  const { distanceUnit } = useContext(RaceDataContext); 

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(raceData)}>
      <View style={styles.backgroundDistance}>
        <Text style={styles.backgroundDistanceText}>{formatRaceDistance(raceData.distance, distanceUnit)}</Text>
      </View>
      <MedalIcon rank={raceData.rank} event={raceData.event} />
      <View style={styles.content}>
        <Text style={styles.title}>{raceData.raceName}</Text>
        <Text style={styles.description}>{formatDate(raceData.raceDate)}</Text>
        <Text style={styles.time}>{formatRaceTime(raceData.time)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface, 
    borderRadius: theme.roundness,
    padding: theme.spacing.s,
    margin: theme.spacing.s,
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    position: 'relative',
  },
  backgroundDistance: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 10, 
    justifyContent: 'center',
    alignItems: 'flex-end', 
    zIndex: -1, 
  },
  backgroundDistanceText: {
    fontSize: theme.fontSizes.huge, 
    fontWeight: 'bold',
    color: theme.colors.grey, 
  },
  content: {
    marginLeft: theme.spacing.m,
  },
  title: {
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    color: theme.colors.primaryText,
  },
  description: {
    marginTop: theme.spacing.xs,
    color: theme.colors.secondaryText,
  },
  time: {
    marginTop: theme.spacing.xs,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  }
});

export default RaceResultItem;
