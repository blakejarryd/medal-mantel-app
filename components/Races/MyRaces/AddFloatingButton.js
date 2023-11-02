import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const FloatingButton = ({ icon = 'plus', onPress, style }) => (
  <FAB 
    style={{ ...styles.fab, ...style, backgroundColor: theme.colors.primary }} 
    icon={icon} 
    onPress={onPress}
    color= {theme.colors.secondary}          // White color for the icon
    small={false}            // Making sure we're using the standard size for better visibility
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FloatingButton;
