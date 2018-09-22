import { createSwitchNavigator } from "react-navigation";
import FooterNavigation from "./FooterNavigation";

export const Screens = {
  ROOMS: 'Rooms',
  ROOM_DETAILS: 'RoomDetails',
  CREATE_ROOM: 'CreateRoom',
};

export const Stack = createSwitchNavigator({
  MainScreen: FooterNavigation,
});
