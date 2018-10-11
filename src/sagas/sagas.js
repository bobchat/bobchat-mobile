import { eventChannel } from 'redux-saga';
import { takeLatest, call, put, all, take, fork, takeEvery} from 'redux-saga/effects';
import Client from './../lib/client';
import connect from './../lib/connect';
import * as types from './../actions/types';
import * as actions from './../actions/actions';
import * as PrivateRoomActions from "./../actions/PrivateRoomActions";
import * as NavigationService from './../navigation/NavigationService';
import {
  REST_API_URL
} from './../../env';

let API = new Client(REST_API_URL);

export default function* rootSaga() {
  try {
    yield all([
      getTokenWatch(),
      createRoomWatch(),
      listPrivateRoomsWatch(),
      createRoomSuccessWatch(),
      createPrivateRoomWatch(),
      createPrivateRoomSuccessWatch(),
      selectPrivateRoomWatch(),
      selectRoomWatch(),
      listRoomsWatch(),
      listMessagesWatch(),
      upVoteRoomWatch(),
      downVoteRoomWatch(),
      socketIO(),
    ]);
  } catch (e) {
    console.error(e);
  }
}

/*================================================================================
API Requests
================================================================================*/

// Login
function* getTokenWatch() {
  yield takeLatest(types.GET_TOKEN_REQUEST, getTokenSaga);
}

function* getTokenSaga(action) {
  let { deviceUniqueId } = action.payload;
  try {
    const { user, token } = yield call(() => API.getToken(deviceUniqueId));
    yield put(actions.getTokenSuccess(user, token));
  } catch (error) {
    yield put(actions.getTokenFailure(error));
  }
}


// List Private Rooms
function* listPrivateRoomsWatch() {
  yield takeLatest(types.LIST_PRIVATE_ROOMS_REQUEST, listPrivateRoomsSaga);
}

function* listPrivateRoomsSaga(action) {
  try {
    const { rooms } = yield call(() => API.listPrivateRooms());
    yield put(PrivateRoomActions.listPrivateRoomsSuccess(rooms));
  } catch (error) {
    yield put(PrivateRoomActions.listPrivateRoomsFailure(error));
  }
}

// Create Private Room
function* createPrivateRoomWatch() {
  yield takeLatest(types.CREATE_PRIVATE_ROOM_REQUEST, createPrivateRoomSaga);
}

function* createPrivateRoomSaga(action) {
  let newRoom = action.payload;
  try {
    const { room } = yield call(() => API.createPrivateRoom(newRoom));
    yield put(PrivateRoomActions.createPrivateRoomSuccess(room));
  } catch (error) {
    yield put(PrivateRoomActions.createPrivateRoomFailure(error));
  }
}

function* selectPrivateRoomWatch() {
  yield takeLatest(types.SELECT_PRIVATE_ROOM, selectPrivateRoomSaga);
}

function* selectPrivateRoomSaga() {
  yield call(() => NavigationService.navigate('PrivateRoomDetails'))
}

function* createPrivateRoomSuccessWatch() {
  yield takeLatest(types.CREATE_PRIVATE_ROOM_SUCCESS, createPrivateRoomSuccessSaga);
}

function* createPrivateRoomSuccessSaga(action) {
  let { room } = action.payload;
  yield put(PrivateRoomActions.selectPrivateRoom(room._id));
}

function* selectRoomWatch() {
  yield takeLatest(types.SELECT_ROOM, selectRoomSaga);
}

function* selectRoomSaga() {
  yield call(() => NavigationService.navigate('RoomDetails'))
}

// Create Room
function* createRoomWatch() {
  yield takeLatest(types.CREATE_ROOM_REQUEST, createRoomSaga);
}

function* createRoomSaga(action) {
  let newRoom = action.payload;
  try {
    const { room } = yield call(() => API.createRoom(newRoom));
    yield put(actions.createRoomSuccess(room));
  } catch (error) {
    yield put(actions.createRoomFailure(error));
  }
}


function* createRoomSuccessWatch() {
  yield takeLatest(types.CREATE_ROOM_SUCCESS, createRoomSuccessSaga);
}

function* createRoomSuccessSaga(action) {
  let { room } = action.payload;
  console.log(room);
  console.log('this one');
  yield put(actions.selectRoom(room._id));
}

function* selectRoomWatch(){
  yield takeLatest(types.SELECT_ROOM, selectRoomSaga); 
}

function* selectRoomSaga(){
  yield call(() => NavigationService.navigate('RoomDetails'))  
}

// List Rooms
function* listRoomsWatch() {
  yield takeLatest(types.LIST_ROOMS_REQUEST, listRoomsSaga);
}

function* listRoomsSaga(action) {
  const {lat, lng} = action.payload;
  try {
    const { rooms } = yield call(() => API.listRooms(lat, lng));
    yield put(actions.listRoomsSuccess(rooms));
  } catch (error) {
    yield put(actions.listRoomsFailure(error));
  }
}

// Up Vote
function* upVoteRoomWatch(){
  yield takeLatest(types.UP_VOTE_ROOM_REQUEST, upVoteRoomSaga);
}

function* upVoteRoomSaga(action){
  const { roomId } = action.payload;
  try {
    const { user, room } = yield call(() => API.upVoteRoom(roomId));
    yield put(actions.upVoteRoomSuccess(user, room));
  } catch (error) {
    yield put(actions.upVoteRoomFailure(error));
  }
}

// Down Vote
function* downVoteRoomWatch() {
  yield takeLatest(types.DOWN_VOTE_ROOM_REQUEST, downVoteRoomSaga);
}

function* downVoteRoomSaga(action) {
  const { roomId } = action.payload;
  try {
    const { user, room } = yield call(() => API.downVoteRoom(roomId));
    yield put(actions.downVoteRoomSuccess(user, room));
  } catch (error) {
    yield put(actions.downVoteRoomFailure(error));
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
      yield fork(write, socket, types.SELECT_PRIVATE_ROOM, 'room'),
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
