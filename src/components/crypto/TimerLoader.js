import React from 'react';

import Loader from './Loader';
import Timer from './Timer';

export default ({ isLoading, onTimerEnd, timerEnd, totalTime }) => {
  return isLoading ? <Loader/> : <Timer timerEnd={ timerEnd } totalTime={ totalTime } onEnd={ onTimerEnd }/>;
};
