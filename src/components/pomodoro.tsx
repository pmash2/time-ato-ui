type PomodoroState = {
    phase: string
    timeRemaining: string
}
type myProps = {
    pomodoroState: PomodoroState
};

const Pomodoro = (pomo: myProps) => {
    return(
        <div>
            <div>Current State: {pomo.pomodoroState.phase}</div>
            <div>Time Remaining: {pomo.pomodoroState.timeRemaining}</div>
        </div>
    )
}

export { Pomodoro };