import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {
  calculateTransitionDelay,
  calculateAbsoluteChange,
  formatPercentage,
  indicateChange,
} from './helpers';

const PortfolioItem = ({ change, fetching, index, symbol, totalItems, value }) => (
  <ContainingDiv fetching={ fetching } index={ index } totalItems={ totalItems } header={ index === 0 }>
    <Symbol>{ symbol }</Symbol>
    <Indicator
      change={ change }
    >
      <FontAwesome name={ indicateChange(change, 'caret-square-up', 'caret-square-right', 'caret-square-down') } />
    </Indicator>
    <CurrentValue>&euro; { value.toFixed(2) }</CurrentValue>
    <Change trendColor={ indicateChange(change, colors.positive, colors.neutral, colors.negative) }>
      <ChangeItem>&euro; { Math.abs(calculateAbsoluteChange(value, change)).toFixed(2) }</ChangeItem>
      <ChangeItem>{ formatPercentage(change) }</ChangeItem>
    </Change>
  </ContainingDiv>
);

const colors = {
  positive: 'rgba(100, 255, 100, 1)',
  neutral: 'rgba(200, 200, 255, 1)',
  negative: 'rgba(255, 100, 100, 1)',
};

const ContainingDiv = styled.div`
  border-bottom: ${({ header }) => header ? '2px solid rgba(255, 255, 255, .3)' : ''};
  display: flex;
  height: 45px;
  margin-top: 20px;
  opacity: ${props => props.fetching ? 0 : 1};
  overflow: hidden;
  padding-bottom: ${({ header }) => header ? '20px' : '0'}; 
  transform: translate3d(${({ fetching }) => fetching ? -100 : 0}%, 0, 0);
  transition: opacity .3s linear, transform .3s linear;
  transition-delay: ${({index, totalItems, fetching}) => calculateTransitionDelay(index, totalItems, fetching)}ms;
`;

const Change = styled.div`
  align-items: center;
  color: ${({ trendColor }) => trendColor};
  display: flex;
  flex: 1 0 50px;
  font-size: 18px;
  margin-left: 10px;
`;

const ChangeItem = styled.div`
  flex: 0 0 50%;
  text-align: right;
`;

const CurrentValue = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 120px;
  font-size: 32px;
  font-weight: bold;
  justify-content: flex-end;
`;

const Indicator = styled.div`
  align-items: center;
  color: ${({ change }) => indicateChange(change, 'green', 'cadetblue', 'red')};
  display: flex;
  flex: 0 0 40px;
  font-size: 24px;
  justify-content: center;
  margin: 0 10px;
`;

const Symbol = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 50px;
  font-size: 24px;
  font-weight: 700;
  justify-content: flex-end;
  text-align: right;
`;

PortfolioItem.propTypes = {
  change: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default PortfolioItem;
