import React from 'react';
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation';
import PrivateRoomList from './../containers/PrivateRoomList';
import PrivateRoomDetails from './../containers/PrivateRoomDetails';
import BackButton from './../components/BackButton';

const PrivateRoomStack = createStackNavigator(
  {
    PrivateRoomList: {
      screen: PrivateRoomList
    },
    PrivateRoomDetails: {
      screen: PrivateRoomDetails,
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
    },
  },
  {}
);

export default PrivateRoomStack;
