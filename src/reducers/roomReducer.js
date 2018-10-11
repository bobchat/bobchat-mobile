import * as types from './../actions/types';
import { HOUR } from './../lib/time'
import removeElement from './../util/removeElement'
import createHashMap from './../util/createHashMap';

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
    roomsMap: {},
    roomsXHR: false,
    roomsError: null,
    selectedRoomId: null,
  };
}

export default function roomReducer(state = roomState(), action) {
  let { type, payload } = action;
  
  switch (type) {
    case types.UPDATE_NEW_ROOM_FIELD:
      return { ...state, newRoom: { ...state.newRoom, [payload.key]: payload.value } };

    case types.RESET_NEW_ROOM_FIELDS:
      return {...state, newRoom: newRoomState()};

    case types.UP_VOTE_ROOM_REQUEST:
      rooms = Object.values(state.roomsMap).map(room => {
        if(room._id == payload.roomId) {

          let isUpVoted = room.upVoteUserIds.includes(payload.userId);
          let isDownVoted = room.downVoteUserIds.includes(payload.userId)
          if(isUpVoted) return room;
      
          if (isDownVoted) {
            room.downVoteUserIds = removeElement(room.downVoteUserIds, payload.userId);  
          } else {
            room.upVoteUserIds.push(payload.userId);
          }
          return room;
        } else return room;
      });
      return {
        ...state,
        roomsMap: createHashMap(rooms, '_id'),
      };

    case types.DOWN_VOTE_ROOM_REQUEST:
      rooms = Object.values(state.roomsMap).map(room => {
        if (room._id == payload.roomId) {

          let isUpVoted = room.upVoteUserIds.includes(payload.userId);
          let isDownVoted = room.downVoteUserIds.includes(payload.userId)
          if (isDownVoted) return room;

          if (isUpVoted) {
            room.upVoteUserIds = removeElement(room.upVoteUserIds, payload.userId);
          } else {
            room.downVoteUserIds.push(payload.userId);
          }
          return room;
        } else return room;
      });
      return {
        ...state,
        roomsMap: createHashMap(rooms, '_id'),
      };
      

    case types.SELECT_ROOM:
      return { ...state, selectedRoomId: payload.roomId };

    case types.CLEAR_SELECTED_ROOM:
      return {...state, room: null };

    case types.LIST_ROOMS_REQUEST:
      return { ...state, roomsError: null, roomsXHR: true };

    case types.LIST_ROOMS_SUCCESS:
      return { ...state, roomsMap: createHashMap(payload.rooms, '_id'), roomsError: null, roomsXHR: false };

    case types.LIST_ROOMS_FAILURE:
      return { ...state, roomsError: payload.error, roomsXHR: false };


    case types.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        roomsMap: createHashMap([
          ...Object.values(state.roomsMap),
          payload.room,
        ], '_id'),
      }

    default:
      return state;
  }
}
