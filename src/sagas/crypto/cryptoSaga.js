import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './../../actions/crypto';
import fetchCryptoData from './fetchCryptoData';
import fetchGuldenData from './fetchGuldenData';

const calculateInitialPrice = (value, change) => {
  return value / (1 + change / 100);
};

function* handleAction() {
  try {
    yield delay(3000);
    const mainPortfolioData = yield call(fetchCryptoData);
    const guldenData = yield call(fetchGuldenData);

    const portfolio = [
      guldenData,
      ...mainPortfolioData
    ];

    const total = portfolio.reduce((sum, portfolioItem) => {
      const change = portfolioItem.change['24hr'];

      sum.currentValue += portfolioItem.value;
      sum.initialValue += calculateInitialPrice(portfolioItem.value, change)

      return sum;
    }, { initialValue: 0, currentValue: 0 });

    yield put({ type: actions.FETCH_CRYPTO_DATA_SUCCEEDED, payload: [
      {
        symbol: 'TOTAL',
        value: total.currentValue,
        change: {
          ['24hr']: ((total.currentValue - total.initialValue) / total.initialValue) * 100
        }
      },
      ...portfolio
    ]});
  } catch (e) {
    console.log(e);
    yield put({ type: actions.FETCH_CRYPTO_DATA_FAILED });
  }
}

function* cryptoSaga() {
  yield takeEvery(actions.FETCH_CRYPTO_DATA, handleAction);
}

export default cryptoSaga;
