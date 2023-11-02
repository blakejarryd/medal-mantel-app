import React, { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Menu, Portal, Provider, Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../theme';

const AddRaceModal = ({ isVisible, onClose, onSubmit }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(Platform.OS === 'ios');
  const [name, setName] = useState('');
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const resetForm = () => {
    setEventName('');
    setEventDate(new Date());
    setIsDatePickerVisible(false)
    setName('');
    setDistance('');
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  const events = ['5k', '10k', 'Half Marathon', 'Marathon', 'Ultra', 'Other'];
  const surfaces = ['Road', 'Track', 'Trail'];

  const storeData = async (data) => {
    try {
      // Fetch existing race data
      const existingData = await AsyncStorage.getItem('raceData');

      let newData = [];
      if (existingData !== null) {
        // If there's existing data, append new data to it
        newData = [...JSON.parse(existingData), data];
      } else {
        // If no existing data, start with the new data
        newData = [data];
      }
      
      // Store the updated data back to AsyncStorage
      await AsyncStorage.setItem('raceData', JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save the data to the storage", e);
    }
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    if (Platform.OS === 'android') {
      setIsDatePickerVisible(false); // Hide date picker after date selection on Android
    }
    setEventDate(currentDate);
  };

  const displayDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const validateNumberInput = (value, max) => {
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      return '00';
    }
    if (num > max) {
      return max.toString().padStart(2, '0');
    }
    return num.toString().padStart(2, '0');
  };

  const handleBlurHours = () => {
    setHours(validateNumberInput(hours, 99));
  };

  const handleBlurMinutesOrSeconds = (setter, value) => {
    setter(validateNumberInput(value, 59));
  };

  const duration = `${validateNumberInput(hours, 99)}:${validateNumberInput(minutes, 59)}:${validateNumberInput(seconds, 59)}`;
  
  const handleClose = () => {
    resetForm();
    onClose(); 
  };

  const handleSubmit = () => {
    const data = {
      raceDate: eventDate.toISOString().split('T')[0],
      raceName: name,
      distance: eventName === 'Ultra' || eventName === 'Other' ? distance : eventName,
      event: eventName,
      time: duration,
    };
    // Save data to AsyncStorage
    onSubmit(data);
    storeData(data).then(() => {
      resetForm();
      onClose();
    }).catch(error => {
      console.error("An error occurred while storing data", error);
    });
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
            <Text style={styles.label}>Event Name</Text>  
            <TextInput 
                value={name} 
                onChangeText={setName} 
                style={styles.input} 
                placeholder="Name of the Race"
              />

              <Text style={styles.label}>Race Date</Text>
              <View style={styles.dateContainer}>
              {Platform.OS === 'ios' ? (
                // iOS: always show the picker
                <DateTimePicker
                  testID="dateTimePicker"
                  value={eventDate}
                  mode="date"
                  display="compact" // iOS compact style
                  onChange={onDateChange}
                />
              ) : (
                // Android: button to show picker
                <>
                  <Button onPress={displayDatePicker} labelStyle={{ color: theme.colors.primary }} >{eventDate.toDateString()}</Button>
                  {isDatePickerVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={eventDate}
                      mode="date"
                      display="calendar" // Android calendar style
                      onChange={onDateChange}
                    />
                  )}
                </>
              )}
              </View>

              <Text style={styles.label}>Distance</Text>
              <View style={styles.verticalButtonGroup}>
                {events.map(event => (
                  <Button
                  key={event}
                  mode={eventName === event ? "contained" : "outlined"}
                  onPress={() => setEventName(event)}
                  style={styles.verticalEventButton}
                  color={theme.colors.primary}
                  contentStyle={{ backgroundColor: eventName === event ? theme.colors.primary : theme.colors.surface }}
                  labelStyle={{ color: eventName === event ? theme.colors.surface : theme.colors.primary }}
                  >
                  {event}
                  </Button>
                ))}
              </View>

              {(eventName === 'Ultra' || eventName === 'Other') && (
                <>
                  <TextInput 
                    value={distance} 
                    onChangeText={setDistance} 
                    style={styles.input} 
                    placeholder="Distance in km"
                    keyboardType="numeric"
                  />
                </>
              )}

              <Text style={styles.label}>Time</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                  value={hours}
                  onChangeText={setHours}
                  onBlur={handleBlurHours}
                  style={styles.timeInput}
                  keyboardType="numeric"
                  placeholder="HH"
                />
                <Text style={styles.timeSeperator}>:</Text>
                <TextInput
                  value={minutes}
                  onChangeText={setMinutes}
                  onBlur={() => handleBlurMinutesOrSeconds(setMinutes, minutes)}
                  style={styles.timeInput}
                  keyboardType="numeric"
                  placeholder="MM"
                />
                <Text style={styles.timeSeperator}>:</Text>
                <TextInput
                  value={seconds}
                  onChangeText={setSeconds}
                  onBlur={() => handleBlurMinutesOrSeconds(setSeconds, seconds)}
                  style={styles.timeInput}
                  keyboardType="numeric"
                  placeholder="SS"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button 
                  mode="contained" 
                  onPress={handleSubmit} 
                  style={styles.button}
                  color={theme.colors.primary} 
                  contentStyle={{ backgroundColor: theme.colors.primary }}
                  labelStyle={{ color: theme.colors.surface }}
                >
                  Save
                </Button>
                <Button 
                  mode="outlined" 
                  onPress={handleClose} 
                  style={styles.button}
                  color={theme.colors.primary} 
                  contentStyle={{ backgroundColor: theme.colors.surface }}
                  labelStyle={{ color: theme.colors.primary }}
                >
                  Close
                </Button>
              </View>
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
  label: {
    fontSize: theme.fontSizes.medium,
    marginTop: theme.spacing.s,
    color: theme.colors.textPrimary,
  },
  input: {
    backgroundColor: theme.colors.grey,
    height: 45,
    borderRadius: theme.roundness,
    color: theme.colors.textPrimary,
    margin: theme.spacing.s,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.l,
  },
  button: {
    flex: 0.48,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.s,
  },
  eventButton: {
    flex: 1,
    margin: theme.spacing.xs,
  },
  surfaceButton: {
    flex: 1,
    margin: theme.spacing.xs,
  },
  verticalButtonGroup: {
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap',     // Allow wrapping to next line
    justifyContent: 'space-between', // Distributes space evenly
    marginVertical: theme.spacing.s,
  },
  verticalEventButton: {
    margin: theme.spacing.xs,
    flexBasis: '47.5%', // Adjust this value to control the space buttons use
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'start', // Align items to the center to reduce space around
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs, // To add some space below the container
  },
  timeInput: {
    backgroundColor: theme.colors.grey, // Set the background color to grey
    width: 50,
    textAlign: 'left',
    marginHorizontal: theme.spacing.xs, // Add horizontal margin for spacing between inputs
    height: 45, // Match the height of other inputs
    borderRadius: theme.roundness, // Match the border radius of other inputs
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.medium, // Optional, to match font size of other inputs
  },
  timeSeperator: {
    alignSelf: 'center',
  },
});

export default AddRaceModal;
