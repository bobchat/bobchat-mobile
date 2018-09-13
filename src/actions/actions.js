import * as types from "./../actions/types";

/*================================================================================
Register
================================================================================*/

export function setRegisterField(key, value) {
  return {
    type: types.SET_REGISTER_FIELD,
    payload: {
      key,
      value,
    },
  };
}

export function registerRequest(username, phoneNumber) {
  return {
    type: types.REGISTER_REQUEST,
    payload: {
      username,
      phoneNumber
    }
  };
}

export function registerSuccess(user, token) {
  return {
    type: types.REGISTER_SUCCESS,
    payload: {
      user,
      token,
    }
  };
}

export function registerFailure(error) {
  return {
    type: types.REGISTER_FAILURE,
    payload: {
      error,
    }
  };
}

/*================================================================================
Login
================================================================================*/

export function loginRequest(username, phoneNumber) {
  return {
    type: types.LOGIN_REQUEST,
    payload: {
      username,
      phoneNumber
    }
  };
}

export function loginSuccess(user, token) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      user,
      token,
    }
  };
}

export function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    payload: {
      error,
    }
  };
}

/*================================================================================
Rooms
================================================================================*/

export function listRoomsRequest() {
  return {
    type: types.LIST_ROOMS_REQUEST,
    payload: {}
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

export function createRoomRequest(title) {
  return {
    type: types.CREATE_ROOM_REQUEST,
    payload: {
      title
    }
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
