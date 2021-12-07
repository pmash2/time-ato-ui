type PomodoroState = {
    phase: string
    timeRemaining: string
}
type Props = {
    pomodoroState: PomodoroState
};

export const Pomodoro = ({pomodoroState}: Props) => {
    return(
        <div>
            <div>Current State: {pomodoroState.phase}</div>
            <div>Time Remaining: {pomodoroState.timeRemaining}</div>
        </div>
    )
}
