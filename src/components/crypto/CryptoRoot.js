import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/crypto';
import PortfolioItem from './PortfolioItem';
import TimerLoader from '../shared/TimerLoader';

const CryptoRoot = ({ fetchInterval, isFetching, onTimerEnd, portfolio = [], nextFetch }) => (
  <div>
    <TimerLoader
      isLoading={ isFetching }
      onTimerEnd={ onTimerEnd }
      timerEnd={ nextFetch }
      totalTime={ fetchInterval }
    />
    {portfolio.map((portfolioItem, i) => (
      <PortfolioItem
        key={ i }
        fetching={ isFetching }
        symbol={ portfolioItem.symbol }
        value={ portfolioItem.value }
        index={ i }
        totalItems={ portfolio.length }
        change={ portfolioItem.change['24hr'] }
      />
    ))}
  </div>
);

const mapStateToProps = state => {
  return {
    ...state.crypto
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTimerEnd: () => {
      dispatch({ type: actions.FETCH_CRYPTO_DATA });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoRoot);
