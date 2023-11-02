import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../../theme';

const FilterButton = ({ onFilterPress }) => {
  return (
    <FAB 
      icon="filter"
      color= {theme.colors.secondary}  
      onPress={onFilterPress}
      style={styles.fab}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor:  theme.colors.primary,
    bottom: 16,
    left: 16,
  },
});

export default FilterButton;
