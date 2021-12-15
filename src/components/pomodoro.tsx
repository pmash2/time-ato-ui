import "../style/pomodoro.css"

type PomodoroState = {
	phase: string
	timeRemaining: string
	warn: boolean
}
type Props = {
	pomodoroState: PomodoroState
}

export const Pomodoro = ({ pomodoroState }: Props) => {
	const shouldWarn = pomodoroState.warn ? "warn" : ""

	return (
		<div>
			<div>
				Current State:{" "}
				<div id="phase" className={pomodoroState.phase.toLowerCase()}>
					{pomodoroState.phase}
				</div>
			</div>
			<div>
				Time Remaining:{" "}
				<div id="remaining" className={shouldWarn}>
					{pomodoroState.timeRemaining}
				</div>
			</div>
		</div>
	)
}
