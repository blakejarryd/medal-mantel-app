import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { formatDate, formatRaceTime } from '../../../utilities/dateAndTimeUtils';
import { formatRaceDistance } from '../../../utilities/raceDataUtils'; 
import { RaceDataContext } from '../../../services/RaceDataProvider';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../theme';
import MedalIcon from '../../SharedComponents/MedalIcon';

const RaceCard = ({ raceData }) => {
    const navigation = useNavigation();
    const { distanceUnit } = useContext(RaceDataContext); 

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ResultDetails', { raceData })}>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.leftColumn}>
                        <MedalIcon rank={raceData.rank} event={raceData.event} />
                        <Text style={styles.time}>{formatRaceTime(raceData.time)}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.raceName} numberOfLines={3} ellipsizeMode='tail'>{raceData.raceName}</Text>
                        <Text style={styles.raceDate}>{formatDate(raceData.raceDate)} | {formatRaceDistance(raceData.distance, distanceUnit)}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
    };

    const styles = StyleSheet.create({
        card: {
          marginRight: theme.spacing.m,
          borderRadius: theme.roundness,
          borderWidth: 0.5,
          borderColor: theme.colors.grey,
          elevation: 3,
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 1,
          width: 165,
          backgroundColor: theme.colors.surface,
        },
        cardContent: {
          flexDirection: 'column',
          padding: theme.spacing.m,
        },
        leftColumn: {
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: theme.spacing.m,
        },
        textWrapper: {
          flex: 1,
        },
        time: {
          fontSize: theme.fontSizes.medium,
          color: theme.colors.primary,
          fontWeight: 'bold',
        },
        raceName: {
          fontSize: theme.fontSizes.small,
          fontWeight: 'bold',
          color: theme.colors.primaryText,
          marginTop: theme.spacing.s,
        },
        raceDate: {
          fontSize: theme.fontSizes.small,
          color: theme.colors.secondaryText,
          marginTop: theme.spacing.s,
        },
      });

export default RaceCard;
