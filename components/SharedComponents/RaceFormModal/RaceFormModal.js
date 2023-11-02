import React, { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Menu, Portal, Provider, Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaceDataServices from '../../../services/RaceDataServices'
import theme from '../../../theme';
import RaceName from './RaceName'
import RaceDate from './RaceDate'
import RaceDistance from './RaceDistance'
import RaceDuration from './RaceDuration'
import FormButtons from './FormButtons'

const AddRaceModal = ({ isVisible, onClose, onSubmit }) => {
  const [raceName, setRaceName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const resetForm = () => {
    setRaceName('');
    setEventDate(new Date());
    setEventName('');
    setDistance('');
    setDuration('');
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const handleClose = () => {
    resetForm();
    onClose(); 
  };

  const handleSubmit = async () => {
    const data = {
      raceDate: eventDate.toISOString().split('T')[0],
      raceName: raceName,
      distance: distance, 
      event: eventName,
      time: duration,
    };
    onSubmit(data)
    resetForm()
    onClose()
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
            <FormButtons onSave={handleSubmit} onCancel={handleClose} />
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

export default AddRaceModal;
