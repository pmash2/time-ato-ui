import React, { Component } from 'react';
import pomo from 'pomo-timer-lib';
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
    timer = new pomo.Timer({Hours: 0, Minutes: 0, Seconds: 0, Milliseconds: 0});
    pomoState = { currentState: "none", timeRemaining: "1:00" } as PomodoroState;

    constructor(props: any) {
        super(props);
        this.state = {
            remaining: "0:00"
        }
    }

    startTimer = () => {
        console.log("Button clicked");
        let pomoTime = document.getElementById("workTime")! as HTMLInputElement;
        this.timer = new pomo.Timer({Hours: 0, Minutes: 0, Seconds: parseInt(pomoTime.value), Milliseconds: 0});
        this.timer.start();
        setInterval(this.countDown, 50);
    }

    countDown = () => {
        this.setState({
            remaining: pomo.TimeUtilities.timeToString(this.timer.Remaining)
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