import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import EditEvents from './EditEvents';
import ViewEvents from './ViewEvents';


const EventRow = ({ personalBest, displayDistance, isEditing, onEditChange, onSave, onCancel, onEditPress, onDeletePress, distanceUnit }) => {
  return (
    <View style={styles.row}>
      {isEditing ? (
        <EditEvents
          personalBest={personalBest}
          displayDistance={displayDistance}
          onEditChange={onEditChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <ViewEvents
          distanceUnit={distanceUnit}
          personalBest={personalBest}
          displayDistance={displayDistance}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.s,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
});

export default EventRow;
