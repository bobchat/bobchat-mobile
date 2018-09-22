import React, { Component } from 'react'
import authReducer from './src/reducers/authReducer';
import roomReducer from './src/reducers/roomReducer';
import messageReducer from './src/reducers/messageReducer';
import { Stack  } from './src/navigation/Navigation';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootSaga from './src/sagas/sagas';
import * as NavigationService from './src/navigation/NavigationService'

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  combineReducers(
    {
      auth: authReducer,
      room: roomReducer,
      message: messageReducer,
    }
  ),
  compose(
    applyMiddleware(sagaMiddleware),
  )
);

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentDidMount(){
    NavigationService.setNavigator(this.navigator);
  }
  render() {

    return <Provider store={store}>
        <Stack ref={nav => {
            this.navigator = nav;
          }} />
      </Provider>;
  }
}
