import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import RaceResultItem from './RaceResultItem';
import FloatingButton from './AddFloatingButton';
import RaceFormModal from '../RaceFormModal/RaceFormModal';
import NoRaceView from './NoRaceView';
import { useNavigation } from '@react-navigation/native';
import { RaceDataContext } from '../../../services/RaceDataProvider';
import theme from '../../../theme';

const RaceResultsList = () => {
  const { raceData, onNewRaceData } = useContext(RaceDataContext);
  const [sortedRaceData, setSortedRaceData] = useState([]);
  const [isRaceModalVisible, setRaceModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
      const sortedData = [...raceData].sort((a, b) => {
        // Assuming `date` is a string in ISO format, 'YYYY-MM-DD'
        return new Date(b.raceDate) - new Date(a.raceDate);
      });
      setSortedRaceData(sortedData);
  }, [raceData]);
  
  const renderContent = () => {
    if (sortedRaceData.length > 0) { // Use sortedRaceData here
      return (
        <FlatList
          data={sortedRaceData} // Use sortedRaceData here
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
