import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const PortfolioItem = ({ fetching, symbol, value }) => (
  <ContainingDiv fetching={ fetching }>
    <Symbol>{ symbol }</Symbol><CurrentValue>&euro; { value.toFixed(2) }</CurrentValue>
  </ContainingDiv>
);

const ContainingDiv = styled.div`
  display: flex;
  height: ${props => props.fetching ? 0 : 80}px;
  margin-top: ${props => props.fetching ? 0 : 20}px;
  opacity: ${props => props.fetching ? 0 : 1};
  overflow: hidden;
  transition: height .3s linear, margin-top .3s linear, opacity .3s linear;
`;

const CurrentValue = styled.div`
  font-size: 30px;
`;

const Symbol = styled.h1`
  font-size: 20px;
`;

PortfolioItem.propTypes = {
  fetching: PropTypes.bool.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default PortfolioItem;
