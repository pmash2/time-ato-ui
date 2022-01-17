import React, { Component } from "react"
import * as pLib from "@pmash2/pomo-timer-lib"
import { Pomodoro } from "./pomodoro"
import { PomodoroInput } from "./pomodoro-input"
import { PomoSettings } from "../settings-helpers"
import { CreateNotification } from "./windows-notifications"
import { Logo } from "./logo"
import { sendStateUpdate, sendStatusUpdate } from "../helpers/apiHelpers"
import { StatusNotification } from "./status-notification"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" // Default styling
import "../style/in-app-toast.css"  // Time-ato specific overrides

type PomodoroInfo = {
	phase: pLib.Enums.PomodoroState
	timeRemaining: string
	warn: boolean
}
type Props = {
	settings: PomoSettings
}
type MyState = {
	pomoState: PomodoroInfo
	pomoActive: boolean
}

const pomoEvents = pLib.Enums.EmitString
const pomoStates = pLib.Enums.PomodoroState

const notify = (msg: string, sendWindowsNotification: boolean): void => {
	if (sendWindowsNotification) {
		CreateNotification({ title: "Time-ato", body: msg })
	}
	toast(msg)
}

const sendStatus = (phase: pLib.Enums.PomodoroState, timeRemaining: string) => {
	const currentStatus = {
		User: "pashton",
		Date: new Date(),
		State: phase,
		TimeRemaining: timeRemaining,
	}

	sendStatusUpdate(currentStatus)
}

const changePomoState = (
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

export class MainLayout extends Component<Props, MyState> {
	private myPomo: pLib.Pomodoro
	private sendWindowsNotification: boolean
	private loopPomodoros: boolean
	private warningThreshold: number

	constructor({ settings }: Props) {
		super({ settings })
		this.myPomo = pLib.getPomodoro(pLib.getTimer(0, 0, 0, 0), pLib.getTimer(0, 0, 0, 0))
		this.state = {
			pomoState: {
				phase: pomoStates.PendingStart,
				timeRemaining: "0:00",
				warn: false,
			},
			pomoActive: false,
		}
		changePomoState(pomoStates.PendingStart, pomoStates.PendingStart)
		this.sendWindowsNotification = settings.Checkboxes[1].checked
		this.loopPomodoros = settings.Checkboxes[0].checked
		this.warningThreshold = +settings.Inputs[2].value
	}

	useEffect() {
		setInterval(
			() => sendStatus(this.state.pomoState.phase, this.state.pomoState.timeRemaining),
			5000
		)
	}

	handleTimer = (wrk: pLib.Timer, brk: pLib.Timer) => {
		if (!this.state.pomoActive) {
			this.setState({ ...this.state, pomoActive: true })
			this.myPomo = pLib.getPomodoro(wrk, brk)
			changePomoState(pomoStates.Pomodoro, this.state.pomoState.phase)

			this.myPomo.on(pomoEvents.PomodoroComplete, this.handlePomoComplete)
			this.myPomo.on(pomoEvents.BreakComplete, this.handleBreakComplete)

			this.myPomo.start()
			setInterval(this.countDown, 50)
		} else {
			this.myPomo.stop()
			this.setState({ ...this.setState, pomoActive: false })
			changePomoState(pomoStates.Cancelled, this.state.pomoState.phase)
		}
	}

	countDown = () => {
		let shouldWarn = this.myPomo.PercentRemaining <= this.warningThreshold

		this.setState({
			...this.state,
			pomoState: {
				phase: this.myPomo.CurrentState,
				timeRemaining: this.myPomo.Remaining.ToString(false),
				warn: shouldWarn,
			},
		})
	}

	handlePomoComplete = () => {
		notify("Pomodoro completed!", this.sendWindowsNotification)
		changePomoState(pomoStates.Break, this.state.pomoState.phase)
	}

	handleBreakComplete = () => {
		this.setState({ ...this.state, pomoActive: false })

		notify("Break completed! Get back to work!", this.sendWindowsNotification)
		changePomoState(pomoStates.Completed, this.state.pomoState.phase)

		if (this.loopPomodoros) {
			this.myPomo.restart()
			this.setState({ ...this.state, pomoActive: true })
			changePomoState(pomoStates.Pomodoro, this.state.pomoState.phase)
		}
	}

	render() {
		return (
			<div>
				<div id="notifications">
					<StatusNotification
						onFailedConnection={() =>
							toast.error("Error connecting to API", { autoClose: 2000 })
						}
					/>
					<Logo spinning={this.state.pomoActive} />
				</div>
				<Pomodoro pomodoroState={this.state.pomoState} />
				<PomodoroInput onClick={this.handleTimer} pomoRunning={this.state.pomoActive} />
				<ToastContainer />
			</div>
		)
	}
}
