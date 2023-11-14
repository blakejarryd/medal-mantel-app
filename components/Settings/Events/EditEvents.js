import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import theme from '../../../theme';


const EditEvents = ({ personalBest, onEditChange, onSave, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState(personalBest.event);
  const [editedDistance, setEditedDistance] = useState(String(personalBest.distance));

  const handleEventChange = (text) => {
    setEditedEvent(text);
    onEditChange.setEditedEvent(text); // Update parent state
  };

  const handleDistanceChange = (text) => {
    setEditedDistance(text);
    onEditChange.setEditedDistance(text); // Update parent state
  };

  return (
      <View style={styles.editRow}>
        <TextInput
          style={[styles.editInput, styles.eventColumn]}
          value={editedEvent}
          onChangeText={handleEventChange}
        />
        <TextInput
          style={[styles.editInput, styles.distanceColumn]}
          value={editedDistance}
          onChangeText={handleDistanceChange}
          keyboardType="numeric" // Assuming distance is a numeric value
        />
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
  },
  editInput: {
    width: 70,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    marginRight: theme.spacing.s,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.small,
  },
  eventColumn: {
    flex: 3, // Adjust the flex proportion as needed
  },
  distanceColumn: {
    flex: 2, // Adjust the flex proportion as needed
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    margin: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.small,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.small,
  },
});

export default EditEvents