import React, { Component } from 'react';
import * as pomo from 'pomo-timer-lib';
import { Pomodoro } from './pomodoro';
import { PomodoroInput } from './pomodoro-input'

type MyProps = {};
type MyState = {
    remaining: string
};
type PomodoroState = {
    currentState: string
    timeRemaining: string
}

export class MainLayout extends Component<MyProps, MyState> {
    timer = pomo.getTimer(0, 0, 0, 0);
    pomoState = { currentState: "none", timeRemaining: "1:00" } as PomodoroState;

    constructor(props: any) {
        super(props);
        this.state = {
            remaining: "0:00"
        }
    }

    startTimer = (seconds: number) => {
        console.log("Button clicked");

        this.timer = pomo.getTimer(0, 0, seconds, 0);
        this.timer.on("TIMER_COMPLETE", () => {
            console.log("THE TIMER HAS COMPLETED")
            this.timer.stop()
        })

        this.timer.start();
        setInterval(this.countDown, 50);
    }

    countDown = () => {
        this.setState({
            remaining: this.timer.Remaining.ToString()
        })
        this.pomoState = { ...this.pomoState, timeRemaining: this.state.remaining};
    }

    render() {
        return (
            <div>
                <Pomodoro pomodoroState={ this.pomoState } />
                <PomodoroInput onClick={ this.startTimer } />
            </div>
        );
    }
}