import React from 'react';
import styled, { keyframes } from "styled-components";

export default () => (
  <Loader />
);

const pulsateBackground = keyframes`
  0% {
    background: rgba(255, 255, 255, 1);
  }

  50% {
    background: rgba(255, 255, 255, 0);
  }

  100% {
    background: rgba(255, 255, 255, 1);
  }
`;

const Loader = styled.div`
  animation: ${pulsateBackground} 2s ease-in-out infinite;
  background: #fff;
  height: 2px;
  width: 100%;
`;
