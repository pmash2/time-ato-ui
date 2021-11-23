import React from 'react';
import logo from './logo.svg';
import './style/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Time-ato!
        </p>
        <div>Current State:</div>
        <div>Time Remaining:</div>
        <div>Work Time: <input></input></div>
        <div>Break Time: <input></input></div>
        <button>Start Timer</button>
      </header>
    </div>
  );
}

export default App;
