import React from 'react';
import { TouchableOpacity} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import RoomList from './../containers/RoomList'
import CreateRoom from "./../containers/CreateRoom";
import RoomDetails from './../containers/RoomDetails';
import BackButton from './../components/BackButton'

const RoomStack = createStackNavigator(
  {
    RoomList: {
      screen: RoomList,
    },
    CreateRoom: {
      screen: CreateRoom,
    },
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
    }
  },
  {}
);

export default RoomStack;
