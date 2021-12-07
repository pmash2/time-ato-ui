import React from "react"
import { Timer, getTimer } from 'pomo-timer-lib'

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

    return(
        <div>
            <div>Work Time: <input id="workTime" /></div>
            <div>Break Time: <input id="breakTime" /></div>
            <button onClick={ passValues }>
                Start Timer
            </button>
        </div>
    )
}

export { PomodoroInput }
