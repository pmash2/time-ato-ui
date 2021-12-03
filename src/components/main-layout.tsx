import React, { Component } from 'react';
import * as pomo from 'pomo-timer-lib'
import { Pomodoro } from './pomodoro';
import { PomodoroInput } from './pomodoro-input'

type PomodoroState = {
    phase: string
    timeRemaining: string
}
type MyProps = {};
type MyState = {
    currentState: PomodoroState
};

export class MainLayout extends Component<MyProps, MyState> {
    private myPomo: pomo.Pomodoro
    private currState: PomodoroState

    constructor(props: any) {
        super(props);
        this.myPomo = pomo.getPomodoro(pomo.getTimer(0, 0, 0, 0), pomo.getTimer(0, 0, 0, 0))
        this.currState = {
            phase: "TBD",
            timeRemaining: "0:00"
        }
    }

    startTimer = (wrk: pomo.Timer, brk: pomo.Timer) => {
        console.log("Button clicked");

        this.myPomo = pomo.getPomodoro(wrk, brk)

        this.myPomo.on(pomo.EmitString.PomodoroComplete, () => {
            console.log("POMODORO COMPLETE")
        })
        this.myPomo.on(pomo.EmitString.BreakComplete, () => {
            console.log("BREAK COMPLETE")
        })

        this.myPomo.start()
        setInterval(this.countDown, 50);
    }

    countDown = () => {
        this.setState({
            currentState: {
                phase: this.myPomo.CurrentState,
                timeRemaining: this.myPomo.Remaining.ToString()
            }
        })
        this.currState = this.state.currentState
    }

    render() {
        return (
            <div>
                <Pomodoro pomodoroState={ this.currState } />
                <PomodoroInput onClick={ this.startTimer } />
            </div>
        );
    }
}