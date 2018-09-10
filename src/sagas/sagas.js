import { takeLatest, call, put, all } from "redux-saga/effects";
import Client from "./../lib/client";
import * as types from './../actions/types';
import * as actions from './../actions/actions';

let API = new Client('http://localhost:8080');

export default function* rootSaga() {
  yield all(
    [
      loginWatch(),
      registerWatch(),
      createRoomWatch(),
      listRoomsWatch(),
      listMessagesWatch(),
    ]
  );
}

// Login
function* loginWatch() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
}

function* loginSaga(action) {
  let { username, phoneNumber } = action.payload;
  try {
    const { user, token } = yield call(() => API.login(username, phoneNumber));
    yield put(actions.loginSuccess(user, token));
  } catch (error) {
    yield put(actions.loginFailure(error));
  }
}
// Register
function* registerWatch(){
  yield takeLatest(types.REGISTER_REQUEST, registerSaga);
}

function* registerSaga(action) {
  let { username, phoneNumber } = action.payload;
  try {
    const { user, token } = yield call(() => API.register(username, phoneNumber));
    yield put(actions.registerSuccess(user, token));
  } catch (error) {
    yield put(actions.registerFailure(error));
  }
}

// Create Room
function* createRoomWatch() {
  yield takeLatest(types.CREATE_ROOM_REQUEST, createRoomSaga);
}

function* createRoomSaga(action) {
  let { title } = action.payload;
  try {
    const { room } = yield call(() => API.createRoom(title));
    yield put(actions.createRoomSuccess(room));
  } catch (error) {
    yield put(actions.createRoomFailure(error));
  }
}

// List Rooms
function* listRoomsWatch() {
  yield takeLatest(types.LIST_ROOMS_REQUEST, listRoomsSaga);
}

function* listRoomsSaga() {
  try {
    const { rooms } = yield call(() => API.listRooms());
    yield put(actions.listRoomsSuccess(rooms));
  } catch (error) {
    yield put(actions.listRoomsFailure(error));
  }
}

// List Messages
function* listMessagesWatch() {
  yield takeLatest(types.LIST_MESSAGES_REQUEST, listMessagesSaga);
}

function* listMessagesSaga(action) {
  try {
    console.log(action);
    let { roomId } = action.payload;
    const { messages } = yield call(() => API.listMessages(roomId));
    yield put(actions.listMessagesSuccess(messages));
  } catch (error) {
    yield put(actions.listMessagesFailure(error));
  }
}