import React, { useEffect } from 'react';
import logo from './logo.svg';
import './style/App.css';
import { MainLayout } from './components/main-layout';
import { About } from './components/about';
import { Settings } from './components/settings';
import { LoadSettings, CurrentSettingsOptions, SaveSettings } from './settings-helpers'
import { RequestPermission } from './notifications';

function App() {
  let mySettings = CurrentSettingsOptions
  mySettings = LoadSettings(mySettings)

  const updateSettings = (): void => {
    console.log(mySettings)
    mySettings = SaveSettings(mySettings)
    console.log(mySettings)
    alert("New settings saved!")
  }

  useEffect(() => {
    RequestPermission()
  })

  return (
    <div className="App">
      <header className="App-header">
        <div className="modalMenu">
          <About />
          <Settings settings={mySettings} onSave={updateSettings} />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Time-ato!
        </p>
        <MainLayout settings={mySettings} />
      </header>
    </div>
  );
}

export default App;
