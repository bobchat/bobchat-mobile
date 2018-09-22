import * as types from "./../actions/types";
import { HOUR } from './../lib/time'


function newRoomState(){
  return {
    title: '',
    coords: {},
    radius: 200,
    units: 'feet',
    alias: '',
    ownerId: null,
    expiresIn: 2 * HOUR,
    
  };
}

function roomState() {
  return {
    newRoom: newRoomState(),
    rooms: [],
    roomsXHR: false,
    roomsError: null,
    room: null
  };
}

export default function roomReducer(state = roomState(), action) {
  let { type, payload } = action;
  console.log(type);
  switch (type) {
    case types.UPDATE_NEW_ROOM_FIELD:
      return { ...state, newRoom: { ...state.newRoom, [payload.key]: payload.value } };

    case types.RESET_NEW_ROOM_FIELDS:
      return {...state, newRoom: newRoomState()};

    case types.SELECT_ROOM:
      return { ...state, room: payload.room };

    case types.CLEAR_SELECTED_ROOM:
      return {...state, room: null };

    case types.LIST_ROOMS_REQUEST:
      return { ...state, roomsError: null, roomsXHR: true };

    case types.LIST_ROOMS_SUCCESS:
      return { ...state, rooms: payload.rooms, roomsError: null, roomsXHR: false };

    case types.LIST_ROOMS_FAILURE:
      return { ...state, roomsError: payload.error, roomsXHR: false };

    default:
      return state;
  }
}
