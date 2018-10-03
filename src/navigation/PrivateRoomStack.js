import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PrivateRoomList from './../containers/PrivateRoomList'
import RoomDetails from './../containers/RoomDetails';
import BackButton from './../components/BackButton'

const RoomStack = createStackNavigator(
  {
    PrivateRoomList: {
      screen: PrivateRoomList,
    },
    RoomDetails: {
      screen: RoomDetails,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PrivateRoomList');
            }}
          >
            <BackButton />
          </TouchableOpacity>
        ),
      }),
    }
  },
  {}
);

export default RoomStack;
