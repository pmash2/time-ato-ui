import React from 'react';
import logo from './logo.svg';
import './style/App.css';
import { MainLayout } from './components/main-layout';
import { About } from './components/about';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="modalMenu">
          <About />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Time-ato!
        </p>
      </header>
      <body>
        <MainLayout />
      </body>
    </div>
  );
}

export default App;
