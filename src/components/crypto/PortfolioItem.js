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
    <Description>
      <Symbol>{ symbol }</Symbol>
      <Indicator
        change={ change }
      >
        <FontAwesome name={ indicateChange(change, 'caret-square-up', 'caret-square-right', 'caret-square-down') } />
      </Indicator>
    </Description>
    <Value>
      <CurrentValue>&euro; { value.toFixed(2) }</CurrentValue>
      <Change>{ formatPercentage(change) } ( &euro;{ Math.abs(calculateAbsoluteChange(value, change).toFixed(2)) })</Change>
    </Value>
  </ContainingDiv>
);

const ContainingDiv = styled.div`
  border-bottom: ${({ header }) => header ? '2px solid rgba(255, 255, 255, .3)' : ''};
  display: flex;
  height: 60px;
  margin-top: 20px;
  opacity: ${props => props.fetching ? 0 : 1};
  overflow: hidden;
  padding-bottom: ${({ header }) => header ? '20px' : '0'}; 
  transform: translate3d(${({ fetching }) => fetching ? -100 : 0}%, 0, 0);
  transition: opacity .3s linear, transform .3s linear;
  transition-delay: ${({index, totalItems, fetching}) => calculateTransitionDelay(index, totalItems, fetching)}ms;
`;

const Description = styled.div`
  font-size: 20px;
  letter-spacing: .1em;
  padding: 5px 10px;
  text-align: right;
  width: 50px;
`;

const Value = styled.div`
  padding: 0px 10px;
`;

const CurrentValue = styled.div`
  font-size: 28px;
`;

const Change = styled.div`
  color: rgba(255, 255, 255, .5);
  font-size: 18px;
  margin-top: 6px;
`;

const Symbol = styled.div`
  font-weight: 700;
`;

const Indicator = styled.div`
  color: ${({ change }) => indicateChange(change, 'green', 'cadetblue', 'red')};
  margin-right: 2px;
  margin-top: 10px;
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
