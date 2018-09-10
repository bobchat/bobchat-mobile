import React, { Component } from 'react'
import reducer from "./src/reducers/reducer";
import { Stack  } from "./src/navigation/Navigation";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootSaga from "./src/sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
  )
);

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
