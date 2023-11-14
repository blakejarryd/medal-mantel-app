import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import theme from '../../../theme';
import { RaceDataContext } from '../../../services/RaceDataProvider';
import EventHeader from './EventHeader';
import EventRow from './EventRow';

const Events = () => {
  const { distanceUnit, personalBests, setPersonalBest, deletePersonalBest } = useContext(RaceDataContext);

  const [editIndex, setEditIndex] = useState(-1); 
  const [editedEvent, setEditedEvent] = useState(''); 
  const [editedDistance, setEditedDistance] = useState(''); 
  const [isAddingNew, setIsAddingNew] = useState(false);

  const convertToMiles = (kilometers) => {
    return (kilometers * 0.621371).toFixed(2); // Convert to miles and round to 2 decimal places
  };

  useEffect(() => {
    console.log(personalBests);
  }, [personalBests]);

  const handleEditPress = (index) => {
    setEditIndex(index);
    setEditedEvent(personalBests[index].event);
    setEditedDistance(String(personalBests[index].distance));
  };

  const handleDeletePress = (id) => {
    deletePersonalBest(id);
  };

  const handleSaveEdit = (index) => {
    setPersonalBest(editedEvent, parseFloat(editedDistance), personalBests[index].id);
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  const handleAddNewEvent = () => {
    setIsAddingNew(true);
    setEditIndex(-1); // Reset any existing edits
    setEditedEvent('');
    setEditedDistance('');
  };

  const handleSaveNewEvent = () => {
    setIsAddingNew(false);
    setPersonalBest(editedEvent, parseFloat(editedDistance));
  };



  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Events</Text>
        <EventHeader distanceUnit={distanceUnit}/>
        {personalBests.map((personalBest, index) => (
          <EventRow
            key={personalBest.id}
            distanceUnit={distanceUnit}
            personalBest={personalBest}
            isEditing={index === editIndex}
            onEditChange={{ setEditedEvent, setEditedDistance }}
            onSave={() => handleSaveEdit(index)}
            onCancel={handleCancelEdit}
            onEditPress={() => handleEditPress(index)}
            onDeletePress={() => handleDeletePress(personalBest.id)}
          />
        ))}
        {isAddingNew && (
          <EventRow
            distanceUnit={distanceUnit}
            personalBest={{ event: editedEvent, distance: editedDistance }}
            isEditing={true}
            onEditChange={{ setEditedEvent, setEditedDistance }}
            onSave={() => handleSaveNewEvent()}
            onCancel={() => setIsAddingNew(false)}
          />
        )}
        {!isAddingNew && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddNewEvent}>
          <Text style={styles.addButtonText}>Add Event +</Text>
        </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginBottom: theme.spacing.m,
  },
  cardTitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.m,
  },
  addButton: {
    flex: 0.3,
    flexDirection: 'row',
    //backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.roundness,
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  addButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.small,
  },
});

export default Events;