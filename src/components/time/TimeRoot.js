import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

export default class TimeRoot extends React.Component {
  constructor () {
    super(...arguments);

    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
    this.interval = setInterval(this._updateTime.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Time>{ moment(this.state.time).format('H:mm') }</Time>
    );
  }

  _updateTime() {
    this.setState((previousState) => {
      return {
        ...previousState,
        time: Date.now()
      };
    })
  }
};

const Time = styled.div`
  font-size: 84px;
  font-weight: bold;
  text-align: right;
`;
