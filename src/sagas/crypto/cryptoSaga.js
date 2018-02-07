import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './../../actions/crypto';
import fetchCryptoData from './fetchCryptoData';

function* handleAction() {
  try {
    yield delay(3000);
    const data = yield call(fetchCryptoData);
    yield put({ type: actions.FETCH_CRYPTO_DATA_SUCCEEDED, payload: data });
  } catch (e) {
    console.log(e);
    yield put({ type: actions.FETCH_CRYPTO_DATA_FAILED });
  }
}

function* cryptoSaga() {
  yield takeEvery(actions.FETCH_CRYPTO_DATA, handleAction);
}

export default cryptoSaga;
