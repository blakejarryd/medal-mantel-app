import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const EventHeader = ({ distanceUnit }) => {
  return (
    <View style={styles.headerRow}>
      <Text style={[styles.headerLabel, styles.eventColumn]}>Event Name</Text>
      <Text style={[styles.headerLabel, styles.distanceColumn]}>Distance</Text>
      <Text style={[styles.headerLabel, styles.actionsColumn]}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.xs,
  },
  headerLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  eventColumn: {
    flex: 3, 
  },
  distanceColumn: {
    flex: 2, 
  },
  actionsColumn: {
    flex: 3, 
  },
});

export default EventHeader;