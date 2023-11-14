import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons

const PersonalBestEditRow = ({ id, event, distance, onSave, onDelete, onAddNew }) => {
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [eventTitle, setEventTitle] = useState(event);
  const [distanceValue, setDistanceValue] = useState(String(distance));

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSave = () => {
    onSave(eventTitle, distanceValue, id);
    toggleEdit(); // Toggle back to non-edit mode after saving
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            placeholder="Event"
            value={eventTitle}
            onChangeText={(newEventTitle) => setEventTitle(newEventTitle)}
            editable={isEditing} // Enable or disable editing based on isEditing state
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Distance:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            placeholder="Distance"
            value={distanceValue}
            onChangeText={(newDistanceValue) => setDistanceValue(newDistanceValue)}
            keyboardType="numeric"
            editable={isEditing} // Enable or disable editing based on isEditing state
          />
        </View>
        <View style={styles.actionsContainer}>
          {isEditing ? (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>
                <Icon name="save" size={24} color="white" /> {/* Save Icon */}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={styles.buttonText}>
                <Icon name="edit" size={24} color="white" /> {/* Edit Icon */}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>
              <Icon name="delete" size={24} color="white" /> {/* Delete Icon */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginRight: theme.spacing.m, // Removed flex: 1
  },
  label: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.xs, // Added vertical padding
    paddingHorizontal: theme.spacing.s, // Added horizontal padding
    width: 120, // Set a specific width for the input fields
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    marginRight: theme.spacing.s,
  },
  deleteButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
  },
  buttonText: {
    color: theme.colors.surface,
    textAlign: 'center',
  },
  disabledInput: {
    backgroundColor: '#ccc',
  },
});

export default PersonalBestEditRow;
