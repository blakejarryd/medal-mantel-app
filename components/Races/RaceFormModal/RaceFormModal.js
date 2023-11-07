import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import theme from '../../../theme';
import RaceName from './RaceName'
import RaceDate from './RaceDate'
import RaceDistance from './RaceDistance'
import RaceDuration from './RaceDuration'
import FormButtons from './FormButtons'

const RaceFormModal = ({ isVisible, onClose, onSubmit, event, raceData }) => {
  const [raceName, setRaceName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventName, setEventName] = useState('');;
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [raceId, setRaceId] = useState(null);

  useEffect(() => {
      setRaceName(raceData?.raceName || '');
      setEventDate(raceData?.raceDate ? new Date(raceData.raceDate) : new Date());
      setEventName(raceData?.event || event || '');
      setDistance(raceData?.distance || '');
      if (raceData?.time) {
        const timeParts = raceData.time.split(':');
        setHours(timeParts[0] || '00');
        setMinutes(timeParts[1] || '00');
        setSeconds(timeParts[2] || '00');
      } else {
        setHours('');
        setMinutes('');
        setSeconds('');
      }
      setRaceId(raceData?.id || null);
  }, [raceData, event]);

  const resetForm = () => {
    setRaceName('');
    setEventDate(new Date());
    setEventName('');
    setDistance('');
    setHours('');
    setMinutes('');
    setSeconds('');
    setRaceId(null);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const handleClose = () => {
    resetForm();
    onClose(); 
  };

  const handleSubmit = async () => {
    function formatDuration(hours, minutes, seconds) {
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    const formattedDuration = formatDuration(hours, minutes, seconds);
    if (!isFormValid()) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const data = {
      id: raceId,
      raceDate: eventDate.toISOString().split('T')[0],
      raceName: raceName,
      distance: distance, 
      event: eventName,
      time: formattedDuration,
    };
    await onSubmit(data)
    resetForm()
    onClose()
  };

  const isFormValid = () => {
    // Check if raceName, eventName, and distance are not empty
    const basicDetailsFilled = raceName.trim() && eventName.trim() && distance.trim();
    // Check if any of the time components have a value
    const timeEntered = hours.trim() || minutes.trim() || seconds.trim();
  
    return basicDetailsFilled && timeEntered;
  };
  

  return (
    <Provider>
      <Portal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={handleClose}
        >
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
            <ScrollView contentContainerStyle={styles.scrollView}>
            <RaceName raceName={raceName} setRaceName={setRaceName} styles={styles} />
            <RaceDate
              value={eventDate}
              onDateSelected={setEventDate} 
              style={styles.dateContainer}
            />
            <RaceDistance
              eventName={eventName}
              setEventName={setEventName}
              distance={distance}
              setDistance={setDistance}
            />
            <RaceDuration
              hours={hours}
              setHours={setHours}
              minutes={minutes}
              setMinutes={setMinutes}
              seconds={seconds}
              setSeconds={setSeconds}
              onDurationChange={handleDurationChange}
            />
            <FormButtons 
              onSave={handleSubmit} 
              onCancel={handleClose}
              isSaveDisabled={!isFormValid()} 
            />
            </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingVertical: 60,
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.l,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollView: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  },
});

export default RaceFormModal;
