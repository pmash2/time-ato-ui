import React, { useEffect, useState } from "react";
import "./style/App.css";
import { MainLayout } from "./components/main-layout";
import { About } from "./components/about";
import { Settings } from "./components/settings";
import { LoadSettings, SaveSettings, PomoSettings } from "./settings-helpers";
import { RequestPermission } from "./notifications";

function App() {
  const [settings, changeSettings] = useState(LoadSettings());

  const updateSettings = (_settings: PomoSettings): PomoSettings => {
    let newSettings = SaveSettings(_settings);
    alert("New settings saved!");
    return newSettings;
  };

  useEffect(() => {
    RequestPermission();
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="modalMenu">
          <About />
          <Settings
            settings={settings}
            onSave={() => changeSettings(updateSettings(settings))}
          />
        </div>
        <p>Time-ato</p>
        <MainLayout settings={settings} />
      </header>
    </div>
  );
}

export default App;
