import React, { ReactElement, useEffect, useState } from "react"
import * as pLib from "@pmash2/pomo-timer-lib"
import { PomodoroStatus } from "./pomodoro"
import { PomodoroInput } from "./pomodoro-input"
import { PomoSettings } from "../settings-helpers"
import { CreateNotification } from "../helpers/windows-notifications"
import { Logo } from "./logo"
import { sendStateUpdate, sendStatusUpdate } from "../helpers/apiHelpers"
import { StatusNotification } from "./status-notification"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" // Default styling
import "../style/in-app-toast.css" // Time-ato specific overrides

type Props = {
	settings: PomoSettings
}

const pomoEvents = pLib.Enums.EmitString
const pomoStates = pLib.Enums.PomodoroState

const notify = (msg: string, sendWindowsNotification: boolean): void => {
	if (sendWindowsNotification) {
		CreateNotification({ title: "Time-ato", body: msg })
	}
	toast(msg)
}

const sendStatusUpdateToServer = (phase: pLib.Enums.PomodoroState, timeRemaining: string) => {
	const currentStatus = {
		User: "pashton",
		Date: new Date(),
		State: phase,
		TimeRemaining: timeRemaining,
	}

	sendStatusUpdate(currentStatus)
}

const sendStateUpdateToServer = (
	newState: pLib.Enums.PomodoroState,
	oldState: pLib.Enums.PomodoroState
): void => {
	const statusChange = {
		User: "pashton",
		Date: new Date(),
		OldState: oldState,
		NewState: newState,
	}

	sendStateUpdate(statusChange)
}

let currentPomo: pLib.Pomodoro = pLib.getPomodoro(
	pLib.getTimer(0, 0, 0, 0),
	pLib.getTimer(0, 0, 0, 0)
)
let pomoActive: boolean = false

export const MainLayout = ({ settings }: Props): ReactElement => {
	const initState = {
		timeRemaining: "00:00",
		PomodoroPhase: pomoStates.PendingStart,
	}

	const [currentState, setCurrentState] = useState(initState)

	const sendWindowsNotification: boolean = settings.Checkboxes[1].checked
	const loopPomodoros: boolean = settings.Checkboxes[0].checked
	const warningThreshold: number = +settings.Inputs[2].value
	let shouldWarn: boolean = false

	useEffect(() => {
		setInterval(
			() =>
				sendStatusUpdateToServer(
					currentPomo.CurrentState,
					currentPomo.Remaining.ToString()
				),
			5000
		)
	})

	const pomodoroPhaseChange = (newPhase: pLib.Enums.PomodoroState) => {
		sendStateUpdateToServer(newPhase, currentState.PomodoroPhase)
		setCurrentState({ ...currentState, PomodoroPhase: newPhase })
	}

	const handleTimer = (wrk: pLib.Timer, brk: pLib.Timer) => {
		if (!pomoActive) {
			pomoActive = true
			currentPomo = pLib.getPomodoro(wrk, brk)
			currentPomo.on(pomoEvents.PomodoroComplete, handlePomoComplete)
			currentPomo.on(pomoEvents.BreakComplete, handleBreakComplete)
			currentPomo.start()

			pomodoroPhaseChange(pomoStates.Pomodoro)
			setInterval(countDown, 500)
		} else {
			currentPomo.stop()
			pomoActive = false
			pomodoroPhaseChange(pomoStates.Cancelled)
		}
	}

	const handlePomoComplete = () => {
		notify("Pomodoro completed!", sendWindowsNotification)
		pomodoroPhaseChange(pomoStates.Break)
	}

	const handleBreakComplete = () => {
		pomoActive = false

		notify("Break completed! Get back to work!", sendWindowsNotification)
		pomodoroPhaseChange(pomoStates.Completed)

		if (loopPomodoros) {
			currentPomo.restart()
			pomoActive = true
			pomodoroPhaseChange(pomoStates.Pomodoro)
		}
	}

	const countDown = () => {
		shouldWarn = currentPomo.PercentRemaining <= warningThreshold
		setCurrentState({ ...currentState, timeRemaining: currentPomo.Remaining.ToString(false) })
	}

	return (
		<div>
			<div id="notifications">
				<StatusNotification
					onFailedConnection={() =>
						toast.error("Error connecting to API", { autoClose: 2000 })
					}
				/>
				<Logo spinning={pomoActive} />
			</div>
			<PomodoroStatus
				currentPhase={currentPomo.CurrentState}
				timeRemaining={currentState.timeRemaining}
				shouldWarn={shouldWarn}
			/>
			<PomodoroInput onClick={handleTimer} pomoRunning={pomoActive} />
		</div>
	)
}
