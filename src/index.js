import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as cryptoActions from './actions/crypto';
import * as departureActions from './actions/departures';
import AppRoot from './components/AppRoot';
import cryptoSaga from './sagas/crypto/crypto';
import departuresSaga from './sagas/departures/departures';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(cryptoSaga);
sagaMiddleware.run(departuresSaga);

ReactDOM.render((
  <Provider store={ store }>
    <AppRoot/>
  </Provider>
), document.querySelector('#AppRoot'));

store.dispatch({ type: cryptoActions.FETCH_CRYPTO_DATA });
store.dispatch({ type: departureActions.FETCH_DEPARTURES_DATA });
