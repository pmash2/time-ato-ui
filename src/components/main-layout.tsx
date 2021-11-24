import React, { Component } from 'react';
import pomo from 'pomo-timer-lib';

type MyProps = {};
type MyState = {
    remaining: string
};

export class MainLayout extends Component<MyProps, MyState> {
    timer = new pomo.Timer({Hours: 0, Minutes: 0, Seconds: 5, Milliseconds: 0});;

    constructor(props: any) {
        super(props);
        this.state = {
            remaining: "0:00"
        }
    }

    startTimer = () => {
        console.log("Button clicked");
        this.timer.start();
        setInterval(this.countDown, 50);
    }

    countDown = () => {
        this.setState({
            remaining: pomo.TimeUtilities.timeToString(this.timer.Remaining)
        })
    }

    render() {
        return (
            <div>
                <div>Current State:</div>
                <div>Time Remaining: {this.state.remaining}</div>
                <div>Work Time: <input></input></div>
                <div>Break Time: <input></input></div>
                <button
                 onClick={this.startTimer}>
                    Start Timer
                </button>
            </div>
        );
    }
}