import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';


const ViewEvents = ({ personalBest, displayDistance, onEditPress, onDeletePress, distanceUnit }) => {
  console.log(displayDistance)
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{personalBest.event}</Text>
      <Text style={styles.value}>{displayDistance} {distanceUnit}</Text>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
      <Icon name="edit" size={26} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
        <Icon name="delete" size={26} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.s,
    backgroundColor: theme.colors.surface,
  },
  label: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    flex: 3, 
  },
  value: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    flex: 2, 
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    margin: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: theme.spacing.xs,
    margin: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ViewEvents
