import * as types from "./../actions/types";
import createHashMap from "./../util/createHashMap";

function newPrivateRoomState() {
  return {
    senderId: null,
    senderAlias: null,
    parentRoomId: null,
  };
}

function privateRoomState() {
  return {
    newPrivateRoom: newPrivateRoomState(),
    privateRoomsMap: {},
    parentRoomIdToChildIdMap: {},
    privateRoomsXHR: false,
    privateRoomsError: null,
    selectedPrivateRoomId: null,
  };
}



export default function roomReducer(state = privateRoomState(), action) {
  let { type, payload } = action;

  switch (type) {
    case types.SELECT_PRIVATE_ROOM:
      return { ...state, selectedPrivateRoomId: payload.roomId };

    case types.LIST_PRIVATE_ROOMS_REQUEST:
      return { ...state, privateRoomsError: null, privateRoomsXHR: true };

    case types.LIST_PRIVATE_ROOMS_SUCCESS:
      return { ...state, privateRoomsMap: createHashMap(payload.rooms, "_id"), parentRoomIdToChildIdMap: createHashMap(payload.rooms, 'parentRoomId', '_id'), privateRoomsError: null, privateRoomsXHR: false };

    case types.LIST_PRIVATE_ROOMS_FAILURE:
      return { ...state, privateRoomsError: payload.error, privateRoomsXHR: false };

    case types.UPDATE_NEW_PRIVATE_ROOM_FIELD:
      return { ...state, newPrivateRoom: { ...state.newPrivateRoom, [payload.key]: payload.value } };

    case types.RESET_NEW_PRIVATE_ROOM_FIELDS:
      return { ...state, newPrivateRoom: newPrivateRoomState() };

    case types.CREATE_PRIVATE_ROOM_SUCCESS:
      let rooms = [
        ...Object.values(state.privateRoomsMap),
        payload.room,
      ];
      return {
        ...state,
        privateRoomsMap: createHashMap(rooms, '_id'),
        parentRoomIdToChildIdMap: createHashMap(rooms, 'parentRoomId', '_id'),
      };

    default:
      return state;
  }
}
