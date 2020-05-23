import * as actions from '../actions/departures';

import { departures as config } from '../config';
import { nextFetchTime } from '../helpers';

const initialState = {
  isFetching: false,
  fetchInterval: config.fetchInterval,
  nextFetch: nextFetchTime(config.fetchInterval),
  lines: {}
};

const convertDepartureStringsToDates = departures => {
  return Object
    .entries(departures)
    .reduce((carry, entry) => {
      return {
        ...carry,
        [entry[0]]: entry[1].map(departure => new Date(departure))
      }
    }, {});
};

const departuresReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actions.FETCH_DEPARTURES_DATA:
      newState.isFetching = true;
      break;
    case actions.FETCH_DEPARTURES_DATA_SUCCEEDED:
      newState.isFetching = false;
      newState.lines = convertDepartureStringsToDates(action.payload);
      newState.nextFetch = nextFetchTime(config.fetchInterval);
      break;
    case actions.FETCH_DEPARTURES_DATA_FAILED:
      newState.isFetching = false;
      newState.nextFetch = nextFetchTime(config.fetchInterval);
      break;
  }

  return newState;
};

export default departuresReducer;
