import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import RaceCard from './PBCard';
import PBAddRaceCard from './PBAddRaceCard';
import theme from '../../../theme';


const PBSwimLane = ({ title, raceDataList, onAddRace }) => {

  return (
    <View style={styles.laneContainer}>
      <Text style={styles.laneTitle}>{title}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {raceDataList.map((raceData, index) => (
            <RaceCard key={index} raceData={raceData} />
        ))}
        <PBAddRaceCard title={title} onPress={() => onAddRace(title)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  laneContainer: {
    marginTop: theme.spacing.m,
  },
  laneTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
    color: theme.colors.textPrimary,
  }
});

export default PBSwimLane;
