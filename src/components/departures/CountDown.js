import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

class CountDown extends React.Component {
  constructor() {
    super();

    this.state = {
      timeRemaining: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(this._update.bind(this), 1000);

    this._update();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <CountDownContainer>{ this._formatSeconds(this.state.timeRemaining) }</CountDownContainer>
    )
  }

  _formatSeconds(totalSeconds) {
    if (totalSeconds <= 0) return '-';

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  _update() {
    this.setState(prevState => {
      return {
        ...prevState,
        timeRemaining: Math.round(moment(this.props.end).diff(moment()) / 1000)
      };
    })
  }
}

const CountDownContainer = styled.div`
  font-size: 24px;
`;

CountDown.propTypes = {
  end: PropTypes.instanceOf(Date).isRequired
};

export default CountDown;
