import { eventChannel } from 'redux-saga';
import { takeLatest, call, put, all, take, fork, takeEvery} from 'redux-saga/effects';
import Client from './../lib/client';
import connect from './../lib/connect';
import * as types from './../actions/types';
import * as actions from './../actions/actions';

let API = new Client('http://192.168.1.36:8080');
let socket;

(async () => {
  socket = await connect();
})();

export default function* rootSaga() {
  try {
    yield all([
      loginWatch(),
      registerWatch(),
      createRoomWatch(),
      listRoomsWatch(),
      listMessagesWatch(),
      socketIO()
    ]);
  } catch (e) {
    console.error(e);
  }
}

/*================================================================================
API Requests
================================================================================*/

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
function* registerWatch() {
  yield takeLatest(types.REGISTER_REQUEST, registerSaga);
}

function* registerSaga(action) {
  let { username, phoneNumber } = action.payload;
  try {
    const { user, token } = yield call(() =>
      API.register(username, phoneNumber)
    );
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
    let { roomId } = action.payload;
    const { messages } = yield call(() => API.listMessages(roomId));
    yield put(actions.listMessagesSuccess(messages));
  } catch (error) {
    yield put(actions.listMessagesFailure(error));
  }
}

/*================================================================================
Socket IO
================================================================================*/

function* socketIO() {
  try {
    const socket = yield call(connect);
    yield all([
      yield fork(read, socket),
      yield fork(write, socket, types.SELECT_ROOM, 'room'),
      yield fork(write, socket, types.SEND_MESSAGE, 'message'),
    ])
  } catch (e) {
    console.error(e);
  }
}

function* write(socket, actionType, messageType) {
  try {
    yield takeEvery(actionType, action => call(action => socket.emit(messageType, action.payload), action));
  } catch (e) {
    console.error(e);
  }
}

function* read(socket) {
  try {
    const channel = yield call(subscribe, socket);
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  } catch (e) {
    console.error(e);
  }
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('message', message => {
      emit(actions.receiveMessage(message));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => { };
  });
}
