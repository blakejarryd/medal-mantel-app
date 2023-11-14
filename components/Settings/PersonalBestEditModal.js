import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import theme from '../../theme';
import { RaceDataContext } from '../../services/RaceDataProvider';
import PersonalBestEditRow from './PersonalBestEditRow';

const PersonalBestEditModal = ({ isVisible, onClose }) => {
  const { personalBests, setPersonalBest, deletePersonalBest } = useContext(RaceDataContext);

  const [isAdding, setIsAdding] = useState(false); // State to track whether "Add" button is clicked
  const [newPersonalBest, setNewPersonalBest] = useState({
    id: '', // Generate a unique ID here
    event: '',
    distance: '',
  });

  useEffect(() => {
    console.log(personalBests);
  }, [personalBests]);

  const handleSave = (eventTitle, distanceValue, id) => {
    setPersonalBest(eventTitle, distanceValue, id);
  };

  const handleDelete = (id) => {
    deletePersonalBest(id);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setNewPersonalBest({
      id: 'generate_unique_id_here', // Generate a unique ID for the new PersonalBest
      event: '',
      distance: '',
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewPersonalBest({
      id: '',
      event: '',
      distance: '',
    });
  };

  const handleCreateNew = () => {
    // Add the newPersonalBest object to the personalBests array in your context
    // Ensure that you generate a unique ID for the newPersonalBest
    // Then, reset isAdding and newPersonalBest state
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Personal Bests</Text>
          {personalBests.map((personalBest) => (
            <PersonalBestEditRow
              key={personalBest.id}
              id={personalBest.id}
              event={personalBest.event}
              distance={personalBest.distance}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
          {isAdding ? (
            <View style={styles.addContainer}>
              <Text style={styles.addTitle}>Add New Personal Best</Text>
              <PersonalBestEditRow
                key={newPersonalBest.id} // Use a key for the new PersonalBestEditRow
                id={newPersonalBest.id}
                event={newPersonalBest.event}
                distance={newPersonalBest.distance}
                onSave={handleCreateNew}
                onDelete={handleCancelAdd}
              />
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={handleAddClick}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  modalTitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.m,
  },
  closeButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.roundness,
    padding: theme.spacing.m,
    marginTop: theme.spacing.m,
  },
  closeButtonText: {
    color: theme.colors.surface,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.m,
    marginVertical: theme.spacing.m,
  },
  addButtonText: {
    color: theme.colors.surface,
  },
  addContainer: {
    marginTop: theme.spacing.m,
  },
  addTitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.s,
  },
});

export default PersonalBestEditModal;
