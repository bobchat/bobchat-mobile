import * as types from "./../actions/types";

function messageState() {
  return {
    messages: [],
    messagesXHR: false,
    messagesError: null,
    newMessage: ""
  };
}

export default function reducer(state = messageState(), action) {
  let { type, payload } = action;
  switch (type) {
    case types.UPDATE_NEW_MESSAGE:
      return { ...state, newMessage: payload.newMessage };

    case types.SEND_MESSAGE:
      return { ...state, newMessage: "" };

    case types.RECEIVE_MESSAGE:
      let messages = state.messages.splice(0);
      messages.push(payload.message);
      return { ...state, messages };

    // List Messages
    case types.LIST_MESSAGES_REQUEST:
      return { ...state, messagesError: null, messagesXHR: true };

    case types.LIST_MESSAGES_SUCCESS:
      console.log(payload.messages);
      return {
        ...state,
        messages: payload.messages,
        messagesError: null,
        messagesXHR: false
      };

    case types.LIST_MESSAGES_FAILURE:
      return { ...state, messagesError: payload.error, messagesXHR: false };

    default:
      return state;
  }
}
