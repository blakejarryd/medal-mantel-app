import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../theme';

const InfoLine = ({ icon, children }) => (
  <View style={styles.infoLine}>
    <MaterialCommunityIcons name={icon} size={28} color={theme.colors.primary} />
    <Paragraph style={styles.infoText}>{children}</Paragraph>
  </View>
);

const styles = StyleSheet.create({
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.s,
  },
  infoText: {
    margin: theme.spacing.m,
    fontSize: theme.fontSizes.large,
    color: theme.colors.text,
  },
});

export default InfoLine;
