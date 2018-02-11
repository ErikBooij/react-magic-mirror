import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CryptoRoot from './crypto/CryptoRoot';

const AppRoot = () => (
  <FullScreen>
    <LeftPanel>
      <CryptoRoot/>
    </LeftPanel>
  </FullScreen>
);

const FullScreen = styled.div`
  background: #000;
  height: 100%;
  width: 100%;
`;

const LeftPanel = styled.div`
  float: left;
  height: 100%;
  padding: 20px;
  width: 240px;
`;

export default connect()(AppRoot);
