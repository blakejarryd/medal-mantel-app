import React, { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Menu, Portal, Provider, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../theme';

const AddRaceModal = ({ isVisible, onClose, onSubmit }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [name, setName] = useState('');
  const [distance, setDistance] = useState('');
  // const [surface, setSurface] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  //const [place, setPlace] = useState('');
  // const [resultsLink, setResultsLink] = useState('');
  // const [stravaLink, setStravaLink] = useState('');

  const events = ['5k', '10k', 'Half Marathon', 'Marathon', 'Ultra Marathon', 'Other'];
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

  const handleSubmit = () => {
    const raceTime = `${hours}:${minutes}:${seconds}`;
    
    const data = {
      raceDate: eventDate,
      raceName: name,
      distance: eventName === 'Ultra Marathon' || eventName === 'Other' ? distance : eventName,
      event: eventName,
      time: raceTime,
    };

    // Save data to AsyncStorage
    onSubmit(data);
    
    onClose();
  };

  return (
    <Provider>
      <Portal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
            <ScrollView contentContainerStyle={styles.scrollView}>
              
              <Text style={styles.label}>Event Date:</Text>
              <TextInput 
                value={eventDate} 
                onChangeText={setEventDate} 
                style={styles.input} 
                placeholder="DD-MM-YYYY" 
                color={theme.colors.primary} 
              />

              <Text style={styles.label}>Event Name:</Text>
              <TextInput 
                value={name} 
                onChangeText={setName} 
                style={styles.input} 
                placeholder="Name of the Race"
              />

              <Text style={styles.label}>Event:</Text>
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

              {(eventName === 'Ultra Marathon' || eventName === 'Other') && (
                <>
                  <Text style={styles.label}>Distance:</Text>
                  <TextInput 
                    value={distance} 
                    onChangeText={setDistance} 
                    style={styles.input} 
                    placeholder="Distance in km"
                    keyboardType="numeric"
                  />
                </>
              )}

              {/* <Text style={styles.label}>Surface:</Text>
              <View style={styles.buttonGroup}>
                {surfaces.map(surfaceItem => (
                  <Button
                    key={surfaceItem}
                    mode={surface === surfaceItem ? "contained" : "outlined"}
                    onPress={() => setSurface(surfaceItem)}
                    style={styles.surfaceButton}
                    color={theme.colors.primary} 
                    contentStyle={{ backgroundColor: surface === surfaceItem ? theme.colors.primary : theme.colors.surface }}
                    labelStyle={{ color: surface === surfaceItem ? theme.colors.surface : theme.colors.primary }}
                  >
                    {surfaceItem}
                  </Button>
                ))}
              </View> */}

              <Text style={styles.label}>Time:</Text>
              <View style={styles.timeContainer}>
                <TextInput 
                  value={hours} 
                  onChangeText={setHours}
                  style={styles.timeInput}
                  placeholder="HH"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text>:</Text>
                <TextInput 
                  value={minutes} 
                  onChangeText={setMinutes}
                  style={styles.timeInput}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text>:</Text>
                <TextInput 
                  value={seconds} 
                  onChangeText={setSeconds}
                  style={styles.timeInput}
                  placeholder="SS"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>

              {/* <Text style={styles.label}>Place:</Text>
              <TextInput 
                value={place} 
                onChangeText={setPlace} 
                style={styles.input} 
                placeholder="Race Position" 
                keyboardType="numeric"
              />

              <Text style={styles.label}>Link to Results:</Text>
              <TextInput 
                value={resultsLink} 
                onChangeText={setResultsLink} 
                style={styles.input} 
                placeholder="https://"
              />

              <Text style={styles.label}>Link to Strava Activity:</Text>
              <TextInput 
                value={stravaLink} 
                onChangeText={setStravaLink} 
                style={styles.input} 
                placeholder="https://"
              /> */}

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
                  onPress={onClose} 
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
    marginVertical: theme.spacing.s,
  },
  verticalEventButton: {
    margin: theme.spacing.xs,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: theme.colors.grey,
    width: 50,
    height: 45,
    marginHorizontal: theme.spacing.xs,
    paddingVertical: 0,
    borderRadius: theme.roundness,
  },
});

export default AddRaceModal;
