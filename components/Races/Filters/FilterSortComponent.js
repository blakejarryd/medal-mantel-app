import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../theme';

// Updated initial filters state
const initialFilters = {
  all: true,
  "5k": false,
  "10k": false,
  halfmarathon: false,
  marathon: false,
  ultra: false,
  other: false,
};

const FilterSortComponent = ({ onSort, onFilter, currentSort, currentFilter, sortDirection, filterModalVisible, onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState({ ...initialFilters });

  const filterOptions = ["all", "5k", "10k", "halfmarathon", "marathon", "ultra", "other"];
  const sortOptions = ["date", "distance", "time"];

  const handleFilterSelect = (option) => {
    if (option === 'all') {
      setSelectedFilters({ ...initialFilters });
    } else {
      setSelectedFilters(prev => ({ ...prev, all: false, [option]: !prev[option] }));
    }
  };

  const applyChanges = () => {
    if (selectedFilters.all) {
      onFilter('all');
    } else {
      const activeFilters = Object.keys(selectedFilters).filter(key => key !== 'all' && selectedFilters[key]);
      onFilter(activeFilters);
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Sort</Text>
            <View style={styles.sortButtonsContainer}>
              {sortOptions.map((option, index) => (
                <Button 
                  mode={currentSort === option ? "contained" : "outlined"}
                  onPress={() => onSort(option)}
                  style={[styles.modalButton, index !== sortOptions.length - 1 && styles.rightMargin]}
                  key={option}
                  icon={() => <MaterialCommunityIcons name={getIconName(option)} size={20} color="grey" />}
                >
                  {option}
                  {currentSort === option && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
              ))}
            </View>

            <Text style={styles.modalTitle}>Filter</Text>
            {filterOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.checkboxContainer}
                onPress={() => handleFilterSelect(option)}
              >
                <Checkbox
                  status={selectedFilters[option] ? 'checked' : 'unchecked'}
                />
                <Text style={styles.checkboxLabel}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </TouchableOpacity>
            ))}

            <Button mode="contained" onPress={applyChanges}>
              Apply
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getIconName = (option) => {
  switch (option) {
    case 'date':
      return 'calendar';
    case 'distance':
      return 'tape-measure';
    case 'time':
      return 'clock-outline';
    default:
      return 'help-circle-outline';
  }
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginRight: 16,
    marginBottom: 16
  },
  fab: {
    backgroundColor: theme.colors.background,
    color: theme.colors.primary,
    bottom: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  rightMargin: {
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
    padding: 5,
  },
  checkboxLabel: {
    marginLeft: 5,
  },
});

export default FilterSortComponent;
