import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrain } from '@fortawesome/fontawesome-pro-solid';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/departures';
import CountDown from './CountDown';
import TimerLoader from '../shared/TimerLoader';

const DeparturesRoot = ({ isFetching, fetchInterval, lines, nextFetch, onTimerEnd }) => (
  <div style={{ marginTop: '20px'}}>
    <TimerLoader
      isLoading={ isFetching }
      onTimerEnd={ onTimerEnd }
      timerEnd={ nextFetch }
      totalTime={ fetchInterval }
      visible={ false }
    />
    {
      Object.keys(lines).map(line => (
        <Line key={ line }>
          <LineNumber>
            <FontAwesomeIcon icon={ faTrain } style={ iconStyle } size="xs"/>
            { line }
          </LineNumber>
          {
            lines[line].map((departure, index) => (
                <CountDownItem key={ `line.${index}` }>
                  <CountDown end={ departure }/>
                </CountDownItem>
            ))
          }
        </Line>
      ))
    }
  </div>
);

const CountDownItem = styled.div`
  flex: 0 0 100px;
  text-align: center;
`;

const iconStyle = {
  marginRight: 20,
  position: 'relative',
  top: -2
};

const Line = styled.div`
  display: flex;
  justify-content: flex-start;
  line-height: 40px;
  margin-top: 20px;
`;

const LineNumber = styled.div`
  flex: 0 0 70px;
  float: left;
  font-size: 32px;
  font-weight: bold;
  text-align: left;
`;

const mapStateToProps = state => {
  return {
    ...state.departures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTimerEnd: () => {
      dispatch({ type: actions.FETCH_DEPARTURES_DATA });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeparturesRoot);
