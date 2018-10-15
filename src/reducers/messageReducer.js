import * as types from "./../actions/types";
import createHashMap from './../util/createHashMap';

function messageState() {
  return {
    messages: [],
    messagesMap: {},
    messagesXHR: false,
    messagesError: null,
    newMessage: ""
  };
}

export default function reducer(state = messageState(), action) {
  let { type, payload } = action;
  let messagesMap = { ...state.messagesMap };
  
  switch (type) {
    case types.UPDATE_NEW_MESSAGE:
      return { ...state, newMessage: payload.newMessage };

    case types.SEND_MESSAGE:

      return { 
        ...state, 
        newMessage: "",
      };

    case types.RECEIVE_MESSAGE:
      if(messagesMap[payload.message.room]) {
        messagesMap[payload.message.room].push(payload.message);
      } else {
        messagesMap[payload.message.room] = [payload.message];
      }
      
      return {
         ...state, 
         messagesMap,
      };

    // List Messages
    case types.LIST_MESSAGES_REQUEST:
      return { ...state, messagesError: null, messagesXHR: true };

    case types.LIST_MESSAGES_SUCCESS:
      if(payload.messages && payload.messages.length) {
        messagesMap = {
          ...messagesMap,
          [payload.messages[0].room]: payload.messages
        }  
      }
      
      return {
        ...state,
        messagesMap: messagesMap,
        messagesError: null,
        messagesXHR: false
      };

    case types.LIST_MESSAGES_FAILURE:
      return { ...state, messagesError: payload.error, messagesXHR: false };

    default:
      return state;
  }
}
