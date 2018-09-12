import * as types from './../actions/types'

function initialState() {
  return {
    // User
    user: null,
    token: null,
    // Rooms
    rooms: [],
    roomsXHR: false,
    roomsError: null,
    room: null,
    // Messages
    messages: [],
    messagesXHR: false,
    messagesError: null,
    newMessage: "",
    socket: null,
  };
}

export default function reducer(state, action) {
  let { type, payload } = action;
  switch (type) {

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };

    case types.SELECT_ROOM:
      return {
        ...state,
        room: payload.room,
      };


    case types.UPDATE_NEW_MESSAGE:
      return {
        ...state,
        newMessage: payload.newMessage
      };

    case types.SEND_MESSAGE:
      return {
        ...state,
        newMessage: ''
      };

    case types.RECEIVE_MESSAGE:
      let messages = state.messages.splice(0);
      messages.push(payload.message);
      return {
        ...state,
        messages,
      };

    // List Messages
    case types.LIST_MESSAGES_REQUEST:
      return {
        ...state,
        messagesError: null,
        messagesXHR: true,
      };

    case types.LIST_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload.messages,
        messagesError: null,
        messagesXHR: false,
      };

    case types.LIST_MESSAGES_FAILURE:
      return {
        ...state,
        messagesError: payload.error,
        messagesXHR: false,
      };
    

    // List Rooms
    case types.LIST_ROOMS_REQUEST:
      return {
        ...state,
        roomsError: null,
        roomsXHR: true,  
      };

    case types.LIST_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: payload.rooms,
        roomsError: null,
        roomsXHR: false,
      };

    case types.LIST_ROOMS_FAILURE:
      return {
        ...state,
        roomsError: payload.error,
        roomsXHR: false,
      };

    default:
      return initialState();
  }
}
