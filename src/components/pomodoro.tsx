import "../style/pomodoro.css"
import { ServerTime } from "./server-time"
import { toast } from "react-toastify"
import { Enums } from "@pmash2/pomo-timer-lib"

type Props = {
	currentPhase: Enums.PomodoroState
	timeRemaining: string
	shouldWarn: boolean
}

export const PomodoroStatus = ({ currentPhase, timeRemaining, shouldWarn }: Props) => {
	const warnClass = shouldWarn ? "warn" : ""
	return (
		<div>
			<div>
				<ServerTime
					onFailedConnection={() =>
						toast.error("Error syncing time with server", { autoClose: 2000 })
					}
				/>
			</div>
			<div>
				Current State:{" "}
				<div id="phase" className={currentPhase.toLowerCase()}>
					{currentPhase}
				</div>
			</div>
			<div>
				Time Remaining:{" "}
				<div id="remaining" className={warnClass}>
					{timeRemaining}
				</div>
			</div>
		</div>
	)
}
