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
                <MaterialCommunityIcons name="plus" size={50} color={theme.colors.grey} />
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
        borderWidth: 1, 
        borderColor: theme.colors.grey,
        borderStyle: 'dashed', 
        backgroundColor: theme.colors.altBackground,
        justifyContent: 'center',
        alignItems: 'center',
        width: 165,
    },
    cardContent: {
        padding: theme.spacing.m,
        alignItems: 'center',
    },
    text: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.secondaryText,
        marginTop: theme.spacing.s,
    },
});

export default PBAddRaceCard;
