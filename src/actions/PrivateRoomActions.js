import * as types from "./types";

/*================================================================================
Select Private Room
================================================================================*/

export function selectPrivateRoom(roomId) {
  return {
    type: types.SELECT_PRIVATE_ROOM,
    payload: {
      roomId,
    },
  };
}

export function clearSelectedPrivateRoom() {
  return {
    type: types.CLEAR_SELECTED_PRIVATE_ROOM,
    payload: {
      room: null
    }
  };
}

/*================================================================================
List Private Room
================================================================================*/

export function listPrivateRoomsRequest() {
  return {
    type: types.LIST_PRIVATE_ROOMS_REQUEST,
    payload: {}
  };
}

export function listPrivateRoomsSuccess(rooms) {
  return {
    type: types.LIST_PRIVATE_ROOMS_SUCCESS,
    payload: {
      rooms
    }
  };
}

export function listPrivateRoomsFailure(error) {
  return {
    type: types.LIST_PRIVATE_ROOMS_FAILURE,
    payload: {
      error
    }
  };
}

/*================================================================================
Init Private Room
================================================================================*/

export function initializePrivateRoom() {
  return {
    type: types.INITIALIZE_PRIVATE_ROOM,
    payload: {},
  };
}

export function updateNewPrivateRoomField(key, value) {
  return {
    type: types.UPDATE_NEW_PRIVATE_ROOM_FIELD,
    payload: {
      key,
      value,
    },
  };
}


export function resetNewPrivateRoomFields() {
  return {
    type: types.RESET_NEW_PRIVATE_ROOM_FIELDS,
    payload: {},
  };
}

/*================================================================================
Create Private Room
================================================================================*/

export function createPrivateRoomRequest(newRoom) {
  return {
    type: types.CREATE_PRIVATE_ROOM_REQUEST,
    payload: newRoom
  };
}

export function createPrivateRoomSuccess(room) {
  return {
    type: types.CREATE_PRIVATE_ROOM_SUCCESS,
    payload: {
      room
    }
  };
}

export function createPrivateRoomFailure(error) {
  return {
    type: types.CREATE_PRIVATE_ROOM_FAILURE,
    payload: {
      error
    }
  };
}
