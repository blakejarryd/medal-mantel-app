import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RaceResultItem from './RaceResultItem';
import FloatingButton from './AddFloatingButton';
import RaceFormModal from '../RaceFormModal/RaceFormModal';
import NoRaceView from './NoRaceView';
import { useNavigation } from '@react-navigation/native';
import { RaceDataContext } from '../../../services/RaceDataProvider';
import theme from '../../../theme';

const RaceResultsList = () => {
  const { raceData, onNewRaceData } = useContext(RaceDataContext);
  const [isRaceModalVisible, setRaceModalVisible] = useState(false);
  const navigation = useNavigation();
  
  const renderContent = () => {
    if (raceData && raceData.length > 0) {
      return (
        <FlatList
          data={raceData} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RaceResultItem 
              raceData={item} 
              onPress={() => navigation.navigate('ResultDetails', { raceData: item })}
            />
          )}
        />
      );
    } else {
      return <NoRaceView />;
    }
  };
  
  return ( 
    <View style={styles.container}>
       {renderContent()} 
       <RaceFormModal
         isVisible={isRaceModalVisible}
         onClose={() => setRaceModalVisible(false)}
         onSubmit={onNewRaceData}
       />
       <FloatingButton onPress={() => setRaceModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.m,
  },
});

export default RaceResultsList;
