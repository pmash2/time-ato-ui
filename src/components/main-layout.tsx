import React, { Component } from 'react';
import * as pomo from 'pomo-timer-lib'
import { Pomodoro } from './pomodoro';
import { PomodoroInput } from './pomodoro-input'
import { PomoSettings } from '../settings-helpers';
import { CreateNotification } from '../notifications'
import { Logo } from './logo'

type PomodoroState = {
    phase: string
    timeRemaining: string
    warn: boolean
}
type Props = {
    settings: PomoSettings
};
type MyState = {
    currentState: PomodoroState
};

export class MainLayout extends Component<Props, MyState> {
    private myPomo: pomo.Pomodoro
    private currState: PomodoroState
    private settings: PomoSettings
    private pomoIsActive: boolean

    constructor({settings}: Props) {
        super({settings});
        this.myPomo = pomo.getPomodoro(pomo.getTimer(0, 0, 0, 0), pomo.getTimer(0, 0, 0, 0))
        this.currState = {
            phase: "TBD",
            timeRemaining: "0:00",
            warn: false
        }
        this.settings = settings
        this.pomoIsActive = false
    }

    startTimer = (wrk: pomo.Timer, brk: pomo.Timer) => {
        console.log("Button clicked");
        this.pomoIsActive = true

        this.myPomo = pomo.getPomodoro(wrk, brk)

        this.myPomo.on(pomo.EmitString.PomodoroComplete, () => {
            console.log("POMODORO COMPLETE")

            let title = "Time-ato" as string
            let body = "Pomodoro completed!" as string
            CreateNotification({ title, body })
        })
        this.myPomo.on(pomo.EmitString.BreakComplete, () => {
            console.log(`BREAK COMPLETE - Restart? ${this.settings.Checkboxes[0].checked}`)
            this.pomoIsActive = false

            let title = "Time-ato" as string
            let body = "Break completed! Get back to work!" as string
            CreateNotification({ title, body })

            if (this.settings.Checkboxes[0].checked) {
                this.myPomo.restart()
                this.pomoIsActive = true
            }
        })

        this.myPomo.start()
        setInterval(this.countDown, 50);
    }

    countDown = () => {
        let shouldWarn = this.getRemainingPercent() < +this.settings.Inputs[2].value

        this.setState({
            currentState: {
                phase: this.myPomo.CurrentState,
                timeRemaining: this.myPomo.Remaining.ToString(false),
                warn: shouldWarn
            }
        })
        this.currState = this.state.currentState
    }

    getRemainingPercent = (): number => {
        let totalTime = pomo.TimeUtilities.TimeToMs(this.myPomo.OriginalTime)
        let remaining = pomo.TimeUtilities.TimeToMs(this.myPomo.Remaining)

        return Math.round((remaining / totalTime) * 100)
    }

    render() {
        return (
            <div>
                <Logo spinning={this.pomoIsActive} />
                <Pomodoro pomodoroState={ this.currState } />
                <PomodoroInput onClick={ this.startTimer } />
            </div>
        );
    }
}