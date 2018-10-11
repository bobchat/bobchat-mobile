import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import RoomList from './../containers/RoomList'
import CreateRoom from "./../containers/CreateRoom";
import CreatePrivateRoom from "./../containers/CreatePrivateRoom";
import RoomDetails from './../containers/RoomDetails';
import BackButton from './../components/BackButton'

const RoomStack = createStackNavigator(
  {
    RoomList: RoomList,
    CreateRoom: CreateRoom,
    RoomDetails: {
      screen: RoomDetails,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RoomList');
            }}
          >
            <BackButton />
          </TouchableOpacity>
        ),
      }),
    },
    CreatePrivateRoom: {
      screen: CreatePrivateRoom
    },
  },
  {}
);

export default RoomStack;
