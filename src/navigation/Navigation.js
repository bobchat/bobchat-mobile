import React from 'react'
import { createStackNavigator } from "react-navigation";
import Rooms from "./../containers/Rooms";
import RoomDetails from "./../containers/RoomDetails";
import CreateRoom from "./../containers/CreateRoom";

export const Screens = {
  ROOMS: 'Rooms',
  ROOM_DETAILS: 'RoomDetails',
  CREATE_ROOM: 'CreateRoom',
};

export const Stack = createStackNavigator({
  Rooms: Rooms,
  RoomDetails: RoomDetails,
  CreateRoom: CreateRoom
});
