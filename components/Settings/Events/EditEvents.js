import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';



const EditEvents = ({ personalBest, displayDistance, onEditChange, onSave, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState(personalBest.event);
  const [editedDistance, setEditedDistance] = useState(displayDistance !== undefined ? String(displayDistance) : '');
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOffset(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleEventChange = (text) => {
    setEditedEvent(text);
    onEditChange.setEditedEvent(text); 
  };

  const handleDistanceChange = (text) => {
    setEditedDistance(text);
    onEditChange.setEditedDistance(text); 
  };

  return (
    <ScrollView style={{ flex: 1, marginBottom: keyboardOffset }}>
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
          keyboardType="numeric" 
        />
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Icon name="save" size={26} color={theme.colors.altBackground} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Icon name="cancel" size={26} color={theme.colors.altBackground} />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    fontSize: theme.fontSizes.medium,
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
    flex: 1,
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
    flex: 1,
  },
  cancelButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.small,
  },
});

export default EditEvents