import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../theme';

const SortFAB = ({ sortByDate, toggleSort }) => {
  
  return (
    <FAB
      style={styles.fab}
      small
      icon={() => (
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons 
            name="sort" 
            size={26} 
            color= {theme.colors.secondary}
            style={{ transform: [{ rotate: '270deg' }], marginLeft: -5 }}
          />
          <MaterialCommunityIcons 
            name={sortByDate ? "calendar" : "clock"} 
            size={16} 
            color= {theme.colors.secondary}
          />
        </View>
      )}
      onPress={toggleSort}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: theme.colors.primary,
    bottom: 16,
    left: 16,
  },
});

export default SortFAB;
