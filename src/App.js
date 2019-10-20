import React from 'react';
import Router from './Router';
import AppLayout from './layout/AppLayout';
import { ThemeProvider } from 'styled-components';
import theme from './layout/theme';

import { GameProvider } from './context/GameContext';
import { RouteProvider } from './context/RouteStore';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <GameProvider>
        <RouteProvider>
          <ThemeProvider theme={theme}>
            <AppLayout>
              <Router />
            </AppLayout>
          </ThemeProvider>
        </RouteProvider>
      </GameProvider>
    </AppProvider>
  );
}

export default App;
