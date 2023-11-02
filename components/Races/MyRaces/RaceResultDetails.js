import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Button, Title, Paragraph, IconButton, useTheme, Card } from 'react-native-paper';
import theme from '../../../theme';

const RaceResultDetails = ({ route }) => {
  const { raceData } = route.params;
  const { colors, spacing, fontSize } = theme;

  // Calculate total time in minutes
  const [hours, minutes, seconds] = raceData.time.split(':').map(Number);
  const totalTimeMinutes = hours * 60 + minutes + seconds / 60;

  // Calculate distance in km
  const distanceKm = parseFloat(raceData.distance);

  // Calculate average pace per km
  const avgPace = totalTimeMinutes / distanceKm;
  const avgPaceMinutes = Math.floor(avgPace);
  const avgPaceSeconds = Math.round((avgPace - avgPaceMinutes) * 60);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{raceData.raceName}</Title>
          <Paragraph style={styles.details}>{raceData.distance}</Paragraph>
          <Paragraph style={styles.details}>{raceData.time}</Paragraph>
          <Paragraph style={styles.details}>{`Average Pace: ${avgPaceMinutes}:${avgPaceSeconds < 10 ? '0' + avgPaceSeconds : avgPaceSeconds} per km`}</Paragraph>
          <Paragraph style={styles.details}>{raceData.raceDate}</Paragraph>
          <Paragraph style={styles.details}>{`Bib Number: ${raceData.bibNumber}`}</Paragraph>
          <Paragraph style={styles.details}>{`Race Position: ${raceData.place}`}</Paragraph>
        </Card.Content>
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <Button 
              icon="chart-line" 
              mode="contained" 
              onPress={() => Linking.openURL(raceData.linkToResults)}
              style={styles.actionButton}
            >
              Results
            </Button>
            <Button 
              icon="run-fast" 
              mode="contained" 
              onPress={() => Linking.openURL(raceData.linkToStrava)}
              style={styles.actionButton}
            >
              Strava
            </Button>
          </View>

          <View style={styles.rightActions}>
            <Button 
              icon="pencil" 
              mode="outlined" 
              onPress={() => console.log("Edit")}
              style={styles.actionButton}
            >
              Edit
            </Button>
            <Button 
              icon="delete" 
              mode="outlined" 
              onPress={() => console.log("Delete")}
              style={styles.actionButton}
            >
              Delete
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground,
  },
  card: {
    flex: 1,
    paddingVertical: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.large,
  },
  details: {
    marginBottom: theme.spacing.s,
    fontSize: theme.fontSizes.medium,
  },
  actions: {
    borderTopWidth: 1,
    borderColor: theme.colors.grey, // Note: You may need to add this color to your theme
    paddingTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  actionButton: {
    marginVertical: theme.spacing.s,
  }
});

export default RaceResultDetails;