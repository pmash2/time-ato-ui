import "../style/pomodoro.css"
import { ServerTime } from "./server-time"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" // Default styling
import "../style/in-app-toast.css" // Time-ato specific overrides
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
				<ToastContainer />
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
