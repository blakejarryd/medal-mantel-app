import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { formatDate, formatRaceTime } from '../../../utilities/dateAndTimeUtils';
import { formatRaceDistance } from '../../../utilities/raceDataUtils'; 
import { RaceDataContext } from '../../../services/RaceDataProvider'
import RaceFormModal from '../RaceFormModal/RaceFormModal';
import InfoLine from './InfoLine';
import Actions from './Actions'; 
import theme from '../../../theme';


const RaceResultDetails = ({ route, navigation }) => {
  const { onDeleteRaceData, onUpdateRaceData, distanceUnit } = useContext(RaceDataContext);
  const raceData = route.params.raceData;
  const [isRaceModalVisible, setRaceModalVisible] = useState(false);

  if (!raceData || !raceData.time) {
    console.error('Race data is not available.');
    return null;
  }

  // Calculate total time in minutes
  const [hours, minutes, seconds] = raceData.time.split(':').map(Number);
  const totalTimeMinutes = hours * 60 + minutes + seconds / 60;

  // Calculate distance in km
  const distanceInUnit = formatRaceDistance(raceData.distance, distanceUnit, false);

  // Calculate average pace per km
  const avgPace = totalTimeMinutes / distanceInUnit;
  const avgPaceMinutes = Math.floor(avgPace);
  const avgPaceSeconds = Math.round((avgPace - avgPaceMinutes) * 60);

  // Distance Unit full description
  const distanceUnitFull = distanceUnit === 'km' ? 'kilometer' : 'mile';


  const handleDeleteRace = async () => {
    try {
      await onDeleteRaceData(raceData.id);
      navigation.goBack(); 
    } catch (e) {
      console.log("Error", "Failed to delete the race");
    }
  };

  const handleSubmit = async (data) => {
    try {
      await onUpdateRaceData(data.id, data);
      navigation.goBack(); 
    } catch (e) {
      console.log("Error", "Failed to update the race");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.shadowContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{raceData.raceName}</Title>
            <InfoLine icon="calendar-range">{formatDate(raceData.raceDate)}</InfoLine>
            <InfoLine icon="map-marker-distance">{formatRaceDistance(raceData.distance, distanceUnit)}</InfoLine>
            <InfoLine icon="clock-outline">{formatRaceTime(raceData.time)}</InfoLine>
            <InfoLine icon="speedometer">
              {`${avgPaceMinutes}:${avgPaceSeconds < 10 ? '0' + avgPaceSeconds : avgPaceSeconds} per ${distanceUnitFull}`}
            </InfoLine>
          </Card.Content>
          <Actions
            onEdit={() => {
              setRaceModalVisible(true);
              }}
            onDelete={handleDeleteRace}
          />
        </Card>
      </View>
      {raceData && (
        <RaceFormModal
          isVisible={isRaceModalVisible}
          onClose={() => setRaceModalVisible(false)}
          onSubmit={handleSubmit}
          raceData={raceData}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground,
    padding: theme.spacing.m,
    margin: theme.spacing.s,
  },
  shadowContainer: {
    borderRadius: theme.roundness,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    borderRadius: theme.roundness,
    backgroundColor: 'white', 
  },
  title: {
    fontSize: theme.fontSizes.large, 
    fontWeight: 'bold',
    color: theme.colors.textPrimary, 
    marginBottom: theme.spacing.m,
  },
});

export default RaceResultDetails;