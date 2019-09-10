import React from 'react';
import Router from './Router';
import AppLayout from './layout/AppLayout';
import { ThemeProvider } from 'styled-components';
import theme from './layout/theme';

import { GameProvider } from './context/GameStore';
import { RouteProvider } from './context/RouteStore';

function App() {
  return (
    <GameProvider>
      <RouteProvider>
        <ThemeProvider theme={theme}>
          <AppLayout>
            <Router />
          </AppLayout>
        </ThemeProvider>
      </RouteProvider>
    </GameProvider>
  );
}

export default App;
