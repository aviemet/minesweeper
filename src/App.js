import React from 'react';
import Router from './Router';

import './App.css';
import styled from 'styled-components';
import { GameProvider } from './context/GameStore';
import { RouteProvider } from './context/RouteStore';

const GameStyles = styled.div`
  width: 100%;
  height: 100%;
  background: #222;
  text-align: center;
  display: flex;
`;

function App() {
  return (
    <GameProvider>
      <RouteProvider>
        <GameStyles>
          <Router />
        </GameStyles>
      </RouteProvider>
    </GameProvider>
  );
}

export default App;
