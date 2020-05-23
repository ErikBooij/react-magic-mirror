import React from 'react';
import styled from 'styled-components';

import CryptoRoot from './crypto/CryptoRoot';
import DeparturesRoot from './departures/departuresRoot';
import TimeRoot from './time/TimeRoot';

const AppRoot = () => (
  <FullScreen>
    <LeftTop>
      <CryptoRoot/>
    </LeftTop>
    <LeftBottom>
      <DeparturesRoot/>
    </LeftBottom>
    <RightPanel>
      <TimeRoot/>
    </RightPanel>
  </FullScreen>
);

const FullScreen = styled.div`
  background: #000;
  height: 100%;
  width: 100%;
`;

const LeftBottom = styled.div`
  bottom: 0;
  left: 0;
  padding: 20px;
  position: absolute;
  width: 360px;
`;

const LeftTop = styled.div`
  height: 100%;
  left: 0;
  padding: 20px;
  position: absolute;
  top: 0;
  width: 360px;
`;

const RightPanel = styled.div`
  height: 100%;
  padding: 20px;
  position: absolute;
  right: 0;
  top: 0;
  width: 360px;
`;

export default AppRoot;
