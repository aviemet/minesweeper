import React from 'react';
import Game from './Game';

import './App.css';
import styled from 'styled-components';

const GameStyles = styled.div`
  width: 100%;
  height: 100%;
  background: #222;
  display: block;
  text-align: center;
`;

function App() {
  return (
    <GameStyles>
      <Game />
    </GameStyles>
  );
}

export default App;
