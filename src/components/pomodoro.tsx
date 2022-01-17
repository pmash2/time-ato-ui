import "../style/pomodoro.css"
import { ServerTime } from "./server-time"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" // Default styling
import "../style/in-app-toast.css" // Time-ato specific overrides

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
				<ToastContainer />
				<ServerTime
					onFailedConnection={() =>
						toast.error("Error syncing time with server", { autoClose: 2000 })
					}
				/>
			</div>
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
