import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import PBSwimLane from './PBSwimLane';
import AddRaceModal from '../../SharedComponents/AddRaceModal';
import theme from '../../../theme';

const MyRacesScreen = ({ data, onNewRaceData }) => {
  const events = ['5k', '10k', 'Half Marathon', 'Marathon', 'Ultra Marathon', 'Other'];
  const [isAddRaceModalVisible, setAddRaceModalVisible] = useState(false);

  const [sortByDate, setSortByDate] = useState(false);

  const onAddRace = () => {
    setAddRaceModalVisible(true);
  }

  const compareTimes = (timeA, timeB) => {
    const [hoursA, minutesA, secondsA] = timeA.split(':').map(Number);
    const [hoursB, minutesB, secondsB] = timeB.split(':').map(Number);
  
    const totalSecondsA = hoursA * 3600 + minutesA * 60 + secondsA;
    const totalSecondsB = hoursB * 3600 + minutesB * 60 + secondsB;
  
    return totalSecondsA - totalSecondsB;
  };
  
  const getRacesByEventType = (eventType) => {
    const races = data.filter(race => race.event === eventType);
    
    return sortByDate 
      ? races.sort((a, b) => new Date(b.raceDate) - new Date(a.raceDate))
      : races.sort((a, b) => compareTimes(a.time, b.time));
  };
  

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <ScrollView>
          {events.map(eventType => {
            const races = getRacesByEventType(eventType);
            return <PBSwimLane key={eventType} title={eventType} raceDataList={races} onAddRace={onAddRace}  />;
          })}
        </ScrollView>
        <AddRaceModal
          isVisible={isAddRaceModalVisible}
          onClose={() => setAddRaceModalVisible(false)}
          onSubmit={onNewRaceData}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Fill the entire screen
    backgroundColor: theme.colors.altBackground, 
    paddingLeft: theme.spacing.m,
  },
  container: {
    flex: 1, // Allow this container to expand and fill available space
  },
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
});

export default MyRacesScreen;


