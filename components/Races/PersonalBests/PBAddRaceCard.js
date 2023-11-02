import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../../theme';

const PBAddRaceCard = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                <MaterialCommunityIcons name="medal-outline" size={50} color={theme.colors.grey} />
                    <Text style={styles.text}>Add {title} result</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        padding: theme.spacing.m,
        alignItems: 'center',
    },
    text: {
        fontSize: theme.fontSizes.medium,
        color: theme.colors.primaryText,
        marginTop: theme.spacing.s,
    },
});

export default PBAddRaceCard;
