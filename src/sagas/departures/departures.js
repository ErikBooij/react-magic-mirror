import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/departures';

const fetchDepartures = () => {
  return fetch('http://localhost/backend/departure-times.php')
    .then(response => response.json());
};

function* handleAction() {
  try {
    const departureTimes = yield call(fetchDepartures);

    yield put({ type: actions.FETCH_DEPARTURES_DATA_SUCCEEDED, payload: departureTimes });
  } catch (e) {
    yield put({ type: actions.FETCH_DEPARTURES_DATA_FAILED });
  }

}

function* departuresSaga () {
  yield takeEvery(actions.FETCH_DEPARTURES_DATA, handleAction);
}

export default departuresSaga;
