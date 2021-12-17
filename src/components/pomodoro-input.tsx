import React from "react";
import { Timer, getTimer } from "@pmash2/pomo-timer-lib";
import { LoadSettings } from "../settings-helpers";
import "../style/pomodoro-input.css";

type Props = {
  onClick: (workTime: Timer, breakTime: Timer) => void;
  pomoRunning: boolean;
};

const PomodoroInput = ({ onClick, pomoRunning }: Props) => {
  const passValues = () => {
    let pomoTime = document.getElementById("workTime")! as HTMLInputElement;
    let pTime = parseInt(pomoTime.value);

    let brkTime = document.getElementById("breakTime")! as HTMLInputElement;
    let bTime = parseInt(brkTime.value);
    let wrk: Timer;
    let brk: Timer;

    switch (process.env.NODE_ENV) {
      case "development":
        wrk = getTimer(0, 0, pTime, 0);
        brk = getTimer(0, 0, bTime, 0);
        break;
      case "production":
        wrk = getTimer(0, pTime, 0, 0);
        brk = getTimer(0, bTime, 0, 0);
        break;
      default:
        wrk = getTimer(0, 0, pTime, 0);
        brk = getTimer(0, 0, bTime, 0);
        break;
    }

    onClick(wrk, brk);
  };

  const loadDefaults = () => {
    let newSettings = LoadSettings();
    let work = document.getElementById("workTime")! as HTMLInputElement;
    let brk = document.getElementById("breakTime")! as HTMLInputElement;
    work.value = newSettings.Inputs[0].value;
    brk.value = newSettings.Inputs[1].value;
  };

  return (
    <div>
      <form id="pomoInputs">
        <div>
          <label>Work Time:</label>
          <input id="workTime" />
        </div>
        <div>
          <label>Break Time:</label>
          <input id="breakTime" />
        </div>
      </form>
      <button onClick={passValues}>
        {pomoRunning ? "Stop Timer" : "Start Timer"}
      </button>
      <button onClick={loadDefaults}>Load Defaults</button>
    </div>
  );
};

export { PomodoroInput };
