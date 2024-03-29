import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RaceDataContext } from '../../../services/RaceDataProvider';
import PBSwimLane from './PBSwimLane';
import RaceFormModal from '../RaceFormModal/RaceFormModal';
import theme from '../../../theme';

const MyRacesScreen = () => {
  const { raceData, onNewRaceData } = useContext(RaceDataContext);
  const events = ['5k', '10k', 'Half Marathon', 'Marathon', 'Ultra Marathon', 'Other'];
  const [isRaceModalVisible, setRaceModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const compareTimes = (timeA, timeB) => {
    const [hoursA, minutesA, secondsA] = timeA.split(':').map(Number);
    const [hoursB, minutesB, secondsB] = timeB.split(':').map(Number);
  
    const totalSecondsA = hoursA * 3600 + minutesA * 60 + secondsA;
    const totalSecondsB = hoursB * 3600 + minutesB * 60 + secondsB;
  
    return totalSecondsA - totalSecondsB;
  };
  
  const getRacesByEventType = (eventType) => {
    const races = raceData.filter(race => race.event === eventType);
    return races.sort((a, b) => compareTimes(a.time, b.time));
  };
  
  const onAddRace = (eventType) => {
    setSelectedEvent(eventType);
    setRaceModalVisible(true);
  }

  return (
    <View style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <ScrollView>
          {events.map(eventType => {
            const races = getRacesByEventType(eventType);
            return (
              <PBSwimLane
                key={eventType}
                title={eventType}
                raceDataList={races}
                onAddRace={() => onAddRace(eventType)} 
              />
            ); 
          })}
        </ScrollView>
        <RaceFormModal
          isVisible={isRaceModalVisible}
          onClose={() => {
            setRaceModalVisible(false);
            setSelectedEvent(null); 
          }}
          onSubmit={(newRace) => {
            onNewRaceData({...newRace, event: selectedEvent}); 
            setRaceModalVisible(false); 
            setSelectedEvent(null); 
          }}
          event={selectedEvent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, 
    backgroundColor: theme.colors.altBackground, 
    paddingLeft: theme.spacing.m,
    paddingTop: theme.spacing.s,
  },
  container: {
    flex: 1, 
  },
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
});

export default MyRacesScreen;
