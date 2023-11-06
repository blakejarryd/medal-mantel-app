import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const FloatingButton = ({ icon = 'plus', onPress, style }) => (
  <FAB 
    style={{ ...styles.fab, ...style, backgroundColor: theme.colors.primary }} 
    icon={icon} 
    onPress={onPress}
    color= {theme.colors.secondary}         
    small={false}            
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
