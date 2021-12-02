import React from "react"

type Props = {
    onClick: (seconds: number) => void
}

const PomodoroInput = (props: Props) => {
    const passValues = () => {
        let pomoTime = document.getElementById("workTime")! as HTMLInputElement
        let seconds = parseInt(pomoTime.value)

        props.onClick(seconds);
    }

    return(
        <div>
            <div>Work Time: <input id="workTime"></input></div>
            <div>Break Time: <input></input></div>
            <button onClick={ passValues }>
                Start Timer
            </button>
        </div>
    )
}

export { PomodoroInput }