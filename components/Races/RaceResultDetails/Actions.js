import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../../theme';

const Actions = ({ onEdit, onDelete }) => (
  <View style={styles.actions}>
    <Button icon="pencil" mode="outlined" onPress={onEdit} style={styles.actionButton}>
      Edit
    </Button>
    <Button icon="delete" mode="outlined" onPress={onDelete} style={styles.actionButton}>
      Delete
    </Button>
  </View>
);

const styles = StyleSheet.create({
  actions: {
    borderTopWidth: 1,
    borderColor: theme.colors.grey,
    padding: theme.spacing.s,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.m,
  },
  actionButton: {
    marginVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.s,
    color: theme.colors.textSecondary,
    borderColor: 'grey',
  },
});

export default Actions;
