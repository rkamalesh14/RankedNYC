import React from 'react';

import { Navbar, AppBar } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div id="app">
      <AppBar />
      <Routes />
    </div>
  );
};

export default App;
