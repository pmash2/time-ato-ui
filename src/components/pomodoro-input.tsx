type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const PomodoroInput = (props: Props) => {
    return(
        <div>
            <div>Work Time: <input id="workTime"></input></div>
            <div>Break Time: <input></input></div>
            <button onClick={ props.onClick }>
                Start Timer
            </button>
        </div>
    )
}

export { PomodoroInput }