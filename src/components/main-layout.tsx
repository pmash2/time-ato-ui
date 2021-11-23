import React, { Component } from 'react';

export class MainLayout extends Component {


    render() {
        return (
            <div>
                <div>Current State:</div>
                <div>Time Remaining:</div>
                <div>Work Time: <input></input></div>
                <div>Break Time: <input></input></div>
                <button>Start Timer</button>
            </div>
        );
    }
}