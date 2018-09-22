import * as types from "./../actions/types";

function authState() {
  return {
    user: null,
    token: null,
    
  };
}

export default function reducer(state = authState(), action) {
  let { type, payload } = action;

  switch (type) {
    case types.GET_TOKEN_SUCCESS:
      return { ...state, user: payload.user, token: payload.token };

    default:
      return state;
  }
}
