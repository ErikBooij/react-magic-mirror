import * as actions from '../actions/crypto';

import { nextFetchTime } from '../helpers';
import { crypto as config } from '../config';

const initialState = {
  isFetching: false,
  fetchInterval: config.fetchInterval,
  nextFetch: nextFetchTime(config.fetchInterval)
};

const cryptoCurrencyReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actions.FETCH_CRYPTO_DATA:
      newState.isFetching = true;
      break;
    case actions.FETCH_CRYPTO_DATA_SUCCEEDED:
      newState.isFetching = false;
      newState.nextFetch = nextFetchTime(config.fetchInterval);
      newState.portfolio = action.payload;
      break;
    case actions.FETCH_CRYPTO_DATA_FAILED:
      newState.isFetching = false;
      newState.nextFetch = nextFetchTime(config.fetchInterval);
      break;
  }

  return newState;
};

export default cryptoCurrencyReducer;
