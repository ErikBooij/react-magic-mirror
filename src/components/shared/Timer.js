import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Timer extends React.Component {
  constructor({ timerEnd, totalTime }) {
    super();

    this.state = { timerEnd, totalTime };
    this.state.timeRemaining = this._timeRemaining();

    this.interval = setInterval(() => {
      const timeRemaining = this._timeRemaining();

      if (timeRemaining === 0) {
        this.props.onEnd();

        clearInterval(this.interval);

        return;
      }

      this.setState(() => {
        return {
          timeRemaining: this._timeRemaining()
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <TimerBar visible={ this.props.visible }>
        <TimerProgress style={{ width: ((this.state.totalTime - this.state.timeRemaining ) / this.state.totalTime * 100) + '%' }} />
      </TimerBar>
    );
  }

  _timeRemaining() {
    return Math.max((this.state.timerEnd.getTime() - Date.now()) / 1000, 0);
  }
}

Timer.propTypes = {
  onEnd: PropTypes.func.isRequired,
  timerEnd: PropTypes.instanceOf(Date).isRequired,
  totalTime: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

const TimerBar = styled.div`
  background: rgba(255, 255, 255, .3);
  display: ${({ visible }) => visible ? 'block' : 'none' };
  height: 2px;
  width: 100%;
`;

const TimerProgress = styled.div`
  background: rgba(255, 255, 255, 1);
  height: 2px;
`;
