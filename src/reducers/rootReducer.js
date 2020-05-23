import { combineReducers } from 'redux';

import cryptoReducer from './crypto';
import departuresReducer from './departures';

export default combineReducers({
  crypto: cryptoReducer,
  departures: departuresReducer
});
