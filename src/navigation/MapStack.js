import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import RoomMap from '../containers/RoomMap';
import BackButton from './../components/BackButton'

console.log(RoomMap);

const MapStack = createStackNavigator(
  {
    RoomMap: {
      screen: RoomMap
    }
  },
  {}
);

export default MapStack;
