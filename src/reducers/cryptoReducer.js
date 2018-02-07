import * as actions from '../actions/crypto';

import config from '../config/crypto';

const nextFetchTime = () => {
  return new Date(Date.now() + config.fetchInterval * 1000);
};

const initialState = {
  isFetching: false,
  fetchInterval: config.fetchInterval,
  nextFetch: nextFetchTime()
};

const cryptoCurrencyReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actions.FETCH_CRYPTO_DATA:
      newState.isFetching = true;
      break;
    case actions.FETCH_CRYPTO_DATA_SUCCEEDED:
      newState.isFetching = false;
      newState.nextFetch = nextFetchTime();
      newState.portfolio = action.payload;
      break;
    case actions.FETCH_CRYPTO_DATA_FAILED:
      newState.isFetching = false;
      break;
  }

  return newState;
};

export default cryptoCurrencyReducer;
