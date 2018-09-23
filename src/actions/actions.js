import * as types from "./types";

/*================================================================================
Get Token
================================================================================*/

export function getTokenRequest(deviceUniqueId) {
  return {
    type: types.GET_TOKEN_REQUEST,
    payload: {
      deviceUniqueId, 
    }
  };
}

export function getTokenSuccess(user, token) {
  return {
    type: types.GET_TOKEN_SUCCESS,
    payload: {
      user,
      token,
    }
  };
}

export function getTokenFailure(error) {
  return {
    type: types.GET_TOKEN_FAILURE,
    payload: {
      error,
    }
  };
}

/*================================================================================
Rooms
================================================================================*/

export function updateNewRoomField(key, value){
  return {
    type: types.UPDATE_NEW_ROOM_FIELD,
    payload: {
      key,
      value,
    },
  };
}


export function resetNewRoomFields() {
  return {
    type: types.RESET_NEW_ROOM_FIELDS,
    payload: {},
  };
}

export function listRoomsRequest(lat, lng, radius, units) {
  return {
    type: types.LIST_ROOMS_REQUEST,
    payload: {
      lat,
      lng,
      radius,
      units,
    }
  };
}

export function listRoomsSuccess(rooms) {
  return {
    type: types.LIST_ROOMS_SUCCESS,
    payload: {
      rooms
    }
  };
}

export function listRoomsFailure(error) {
  return {
    type: types.LIST_ROOMS_FAILURE,
    payload: {
      error
    }
  };
}

export function createRoomRequest(newRoom) {
  return {
    type: types.CREATE_ROOM_REQUEST,
    payload: newRoom,
  };
}

export function createRoomSuccess(room) {
  return {
    type: types.CREATE_ROOM_SUCCESS,
    payload: {
      room
    }
  };
}

export function createRoomFailure(error) {
  return {
    type: types.CREATE_ROOM_FAILURE,
    payload: {
      error
    }
  };
}

export function selectRoom(room) {
  return {
    type: types.SELECT_ROOM,
    payload: {
      room,
    },
  };
}

export function clearSelectedRoom() {
  return {
    type: types.CLEAR_SELECTED_ROOM,
    payload: {
      room: null
    },
  };
}

export function upVoteRoom(roomId, userId) {
  return {
    type: types.UP_VOTE_ROOM_REQUEST,
    payload: {
      roomId,
      userId,
    },
  };
}

export function upVoteRoomSuccess(user, room) {
  return {
    type: types.UP_VOTE_ROOM_SUCCESS,
    payload: {
      user,
      room,
    },
  };
}

export function upVoteRoomFailure(error) {
  return {
    type: types.UP_VOTE_ROOM_FAILURE,
    payload: {
      error
    }
  };
}

export function downVoteRoom(roomId, userId) {
  return {
    type: types.DOWN_VOTE_ROOM_REQUEST,
    payload: {
      roomId,
      userId,
    },
  };
}

export function downVoteRoomSuccess(user, room) {
  return {
    type: types.DOWN_VOTE_ROOM_SUCCESS,
    payload: {
      user,
      room,
    },
  };
}

export function downVoteRoomFailure(error) {
  return {
    type: types.DOWN_VOTE_ROOM_FAILURE,
    payload: {
      error
    }
  };
}


/*================================================================================
Messages
================================================================================*/

export function listMessagesRequest(roomId) {
  return {
     type: types.LIST_MESSAGES_REQUEST,
     payload: {
       roomId,
     } 
  };
}

export function listMessagesSuccess(messages) {
  return {
    type: types.LIST_MESSAGES_SUCCESS,
    payload: {
      messages,
    }
  };
}

export function listMessagesFailure(error) {
  return {
    type: types.LIST_MESSAGES_FAILURE,
    payload: {
      error,
    }
  };
}

export function updateNewMessage(newMessage) {
  return {
    type: types.UPDATE_NEW_MESSAGE,
    payload: {
      newMessage
    }
  };
}

export function sendMessage(content, roomId, ownerId) {
  return {
    type: types.SEND_MESSAGE,
    payload: {
      content: content,
      roomId: roomId,
      ownerId: ownerId,
    },
  };
}

export function receiveMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    payload: {
      message,
    },
  };
}
