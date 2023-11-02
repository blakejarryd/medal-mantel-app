import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import FilterSortComponent from '../Filters/FilterSortComponent';
import RaceResultItem from './RaceResultItem';
import FloatingButton from './AddFloatingButton';
import AddRaceModal from '../../SharedComponents/AddRaceModal';
import FilterButton from '../Filters/FilterFloatingButton';
import NoRaceView from './NoRaceView'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../../theme';

const RaceResultsList = ({ data, onNewRaceData }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filter, setFilter] = useState('all');
  const [displayedData, setDisplayedData] = useState([]);
  const [isAddRaceModalVisible, setAddRaceModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const navigation = useNavigation();

  const applyFilter = (dataToFilter) => {
    if (!dataToFilter) return [];
    if (filter === 'all') return dataToFilter;
    if (Array.isArray(filter)) {
      return dataToFilter.filter(item => filter.includes(item.event));
    } else {
      return dataToFilter.filter(item => item.event === filter);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');  // Ensure the default direction is set to 'desc' for any new sort field.
    }
};

  const applySort = (dataToSort) => {
    if (!dataToSort) return [];
    return [...dataToSort].sort((a, b) => {
      let result = 0;
      switch (sortField) {
        case 'date':
          result = new Date(a.raceDate) - new Date(b.raceDate);
          break;
        case 'distance':
          result = parseFloat(a.distance) - parseFloat(b.distance);
          break;
        case 'time':
          const timeToSeconds = (time) => {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            return (hours * 3600) + (minutes * 60) + seconds;
          };
          result = timeToSeconds(a.time) - timeToSeconds(b.time);
          break;
        default:
          result = 0;
      }
      return sortDirection === 'asc' ? result : -result;  // This line ensures that the sort direction is accounted for.
    });
  };

  const handleFilter = (selectedFilters) => {
    // Update the filter state which will trigger useEffect to refilter the data
    setFilter(selectedFilters);
  };

  useEffect(() => {
    if (data) {
      let resultData = applyFilter(data);
      resultData = applySort(resultData);
      setDisplayedData(resultData);
    } else {
      setDisplayedData([]);
    }
  }, [sortField, filter, data, sortDirection]);

    // Conditionally render the list or a message if there's no data
    const noRacesCheck = () => {
      if (displayedData.length > 0) {
        return (
          <FlatList
            data={displayedData}
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
        // Display a friendly message when there's no data
        return <NoRaceView/>;
      }
    };
  
    return ( 
      <SafeAreaView style={styles.container}>
         {noRacesCheck()} 
         <FilterSortComponent
           onSort={handleSort}
           onFilter={handleFilter}
           currentSort={sortField}
           currentFilter={filter}
           sortDirection={sortDirection}
           filterModalVisible={filterModalVisible}
           onClose={() => setFilterModalVisible(false)}
         />
         <AddRaceModal
           isVisible={isAddRaceModalVisible}
           onClose={() => setAddRaceModalVisible(false)}
           onSubmit={onNewRaceData}
         />
         <FloatingButton onPress={() => setAddRaceModalVisible(true)} />
         <FilterButton onFilterPress={() => setFilterModalVisible(true)} /> 
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground
  },
});

export default RaceResultsList;