import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';
import { Text } from 'react-native'
import RoomStack from './RoomStack';
import MapStack from './MapStack';
import PrivateRoomStack from './PrivateRoomStack';
import TabBarComponent from '../components/TabBarComponent';
import { Icon } from "react-native-elements";

// Manifest of possible screens
const FooterNavigation = createBottomTabNavigator(
  {
    RoomTab: {
      screen: RoomStack,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <Text>Posts</Text>,
        tabBarIcon: ({ focused }) => <Icon name='list-unordered' type='octicon'/>
      },
    },
    MapTab: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <Text>Map</Text>,
        tabBarIcon: ({ focused }) => <Icon name='milestone' type='octicon' />
      },
    },
    MessageTab: {
      screen: PrivateRoomStack,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <Text>DM</Text>,
        tabBarIcon: ({ focused }) => <Icon name='mail' type='octicon' />
      },
    },
    SettingsStack: {
      screen: RoomStack,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <Text>Settings</Text>,
        tabBarIcon: ({ focused }) => <Icon name='settings' type='octicon' />
      },
    },
  },
  {
    // Default config for all screens
    headerMode: 'float',
    headerLayoutPreset: 'center',
    initialRouteName: 'RoomTab',
    removeClippedSubviews: true,
    tabBarComponent: TabBarComponent,
    tabBarOptions: {
      
      inactiveTintColor: 'white',
      activeTintColor: 'green',
      showIcon: true,
      style: {
    
      },
      indicatorStyle: {
      },
      labelStyle: {
      },
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: scene => {
        if (scene.navigation.state.key == 'WalletTab') {
          navigation.navigate('HomeScreen');
        } else if (scene.navigation.state.key == 'SendReceiveTab') {
          navigation.navigate('WalletListScreen');
        } else {
          navigation.navigate(scene.navigation.state.routeName);
        }
      },
      gesturesEnabled: false,
    }),
  }
);

export default FooterNavigation;
