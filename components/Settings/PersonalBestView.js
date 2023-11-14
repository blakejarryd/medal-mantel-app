import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import theme from '../../theme';
import { RaceDataContext } from '../../services/RaceDataProvider';

const PersonalBestView = () => {
  const { distanceUnit, personalBests, setPersonalBest } = useContext(RaceDataContext);

  const [editIndex, setEditIndex] = useState(-1); // Index of the currently edited personal best
  const [editedEvent, setEditedEvent] = useState(''); // Edited event title
  const [editedDistance, setEditedDistance] = useState(''); // Edited distance

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

  const handleSaveEdit = (index) => {
    // Save the edited personal best to the context and clear the edit state
    setPersonalBest(editedEvent, parseFloat(editedDistance), personalBests[index].id);
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    // Cancel the edit and clear the edit state
    setEditIndex(-1);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Personal Bests</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.headerLabel, styles.eventColumn]}>Event</Text>
        <Text style={[styles.headerLabel, styles.distanceColumn]}>Distance ({distanceUnit})</Text>
      </View>
      {personalBests.map((personalBest, index) => (
        <View key={personalBest.id} style={styles.row}>
          {index === editIndex ? (
            <View style={styles.editRow}>
              <TextInput
                style={[styles.editInput, styles.eventColumn]}
                value={editedEvent}
                onChangeText={(text) => setEditedEvent(text)}
              />
              <TextInput
                style={[styles.editInput, styles.distanceColumn]}
                value={editedDistance}
                onChangeText={(text) => setEditedDistance(text)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveEdit(index)}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.infoRow}>
              <View style={styles.eventColumn}>
                <Text style={styles.label}>{personalBest.event}</Text>
              </View>
              <View style={styles.distanceColumn}>
                <Text style={styles.value}>
                  {distanceUnit === 'mi'
                    ? convertToMiles(personalBest.distance)
                    : personalBest.distance} {distanceUnit}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPress(index)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
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
  eventColumn: {
    flex: 3, // Adjust flex proportion as needed
  },
  distanceColumn: {
    flex: 2, // Adjust flex proportion as needed
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    marginBottom: theme.spacing.s,
  },
  headerLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
  },
  label: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
  },
  value: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
  },
  editButtonText: {
    color: theme.colors.surface,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    marginRight: theme.spacing.s,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    marginRight: theme.spacing.s,
  },
  saveButtonText: {
    color: theme.colors.surface,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
  },
  cancelButtonText: {
    color: theme.colors.surface,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flexDirection: 'column',
  },
});

export default PersonalBestView;
