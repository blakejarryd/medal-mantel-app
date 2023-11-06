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
  const [duration, setDuration] = useState('');
  const [raceId, setRaceId] = useState(null);

  useEffect(() => {
      setRaceName(raceData?.raceName || '');
      setEventDate(raceData?.raceDate ? new Date(raceData.raceDate) : new Date());
      setEventName(raceData?.event || event || '');
      setDistance(raceData?.distance || '');
      setDuration(raceData?.time || '');
      setRaceId(raceData?.id || null);
  }, [raceData, event]);

  const resetForm = () => {
    setRaceName('');
    setEventDate(new Date());
    setEventName('');
    setDistance('');
    setDuration('');
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
    if (!isFormValid()) {
      alert('Please fill in all fields.');
      return;
    }
    const data = {
      id: raceId,
      raceDate: eventDate.toISOString().split('T')[0],
      raceName: raceName,
      distance: distance, 
      event: eventName,
      time: duration,
    };
    await onSubmit(data)
    resetForm()
    onClose()
  };

  const isFormValid = () => {
    return raceName.trim() && eventName.trim() && distance.trim() && duration.trim();
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
              duration={duration}
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
