import React from "react"
import { Timer, getTimer } from 'pomo-timer-lib'
import { LoadSettings } from '../settings-helpers'

type Props = {
    onClick: (workTime: Timer, breakTime: Timer) => void
}

const PomodoroInput = ({onClick}: Props) => {
    const passValues = () => {
        let pomoTime = document.getElementById("workTime")! as HTMLInputElement
        let pSeconds = parseInt(pomoTime.value)

        let brkTime = document.getElementById("breakTime")! as HTMLInputElement
        let bSeconds = parseInt(brkTime.value)

        let wrk = getTimer(0, 0, pSeconds, 0)
        let brk = getTimer(0, 0, bSeconds, 0)

        onClick(wrk, brk);
    }

    const loadDefaults = () => {
        let newSettings = LoadSettings()
        let work = document.getElementById("workTime")! as HTMLInputElement
        let brk = document.getElementById("breakTime")! as HTMLInputElement
        work.value = newSettings.Inputs[0].value
        brk.value = newSettings.Inputs[1].value
    }

    return(
        <div>
            <div>Work Time: <input id="workTime" /></div>
            <div>Break Time: <input id="breakTime" /></div>
            <button onClick={ passValues }>
                Start Timer
            </button>
            <button onClick={ loadDefaults }>
                Load Defaults
            </button>
        </div>
    )
}

export { PomodoroInput }
