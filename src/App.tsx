import React from 'react';
import logo from './logo.svg';
import './style/App.css';
import { MainLayout } from './components/main-layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Time-ato!
        </p>
        <MainLayout />
      </header>
    </div>
  );
}

export default App;
