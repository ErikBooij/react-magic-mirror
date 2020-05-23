import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import Timer from './Timer';

const TimerLoader = ({ isLoading, onTimerEnd, timerEnd, totalTime, visible = true }) => {
  return isLoading
    ? <Loader visible={ visible }/>
    : <Timer
        timerEnd={ timerEnd }
        totalTime={ totalTime }
        onEnd={ onTimerEnd }
        visible={ visible }
      />;
};

TimerLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onTimerEnd: PropTypes.func.isRequired,
  timerEnd: PropTypes.instanceOf(Date).isRequired,
  totalTime: PropTypes.number.isRequired,
  visible: PropTypes.bool
};

export default TimerLoader;
