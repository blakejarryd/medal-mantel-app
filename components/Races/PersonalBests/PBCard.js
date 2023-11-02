import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDate, formatRaceTime } from '../../../utilities/dateAndTimeUtils';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../theme';

const RaceCard = ({ raceData }) => {
    const navigation = useNavigation();

    const Medal = ({ rank }) => {
        let iconName = 'medal';
        let color = '#eee';  // Default color

        switch (rank) {
            case 1:
                color = "#FFD700";  // gold
                break;
            case 2:
                color = "#C0C0C0";  // silver
                break;
            case 3:
                color = "#CD7F32";  // bronze
                break;
        }

        return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ResultDetails', { raceData })}>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.leftColumn}>
                        <Medal rank={raceData?.rank} />
                        <Text style={styles.time}>{formatRaceTime(raceData.time)}</Text>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.raceName} numberOfLines={3} ellipsizeMode='tail'>{raceData.raceName}</Text>
                        <Text style={styles.raceDate}>{formatDate(raceData.raceDate)}</Text>
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
        fontSize: theme.fontSizes.medium,
        fontWeight: 'bold',
        color: theme.colors.primaryText,
        marginTop: theme.spacing.s,
    },
    raceDate: {
        fontSize: theme.fontSizes.medium,
        color: theme.colors.secondaryText,
        marginTop: theme.spacing.s,
    },
});

export default RaceCard;
