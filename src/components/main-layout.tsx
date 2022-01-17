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
	phase: string
	timeRemaining: string
	warn: boolean
}
type Props = {
	settings: PomoSettings
}
type MyState = {
	pomoState: PomodoroInfo
	settings: PomoSettings
	pomoActive: boolean
}

const pomoEvents = pLib.Enums.EmitString
const pomoStates = pLib.Enums.PomodoroState

export class MainLayout extends Component<Props, MyState> {
	private myPomo: pLib.Pomodoro

	constructor({ settings }: Props) {
		super({ settings })
		this.myPomo = pLib.getPomodoro(pLib.getTimer(0, 0, 0, 0), pLib.getTimer(0, 0, 0, 0))
		this.state = {
			pomoState: {
				phase: "TBD",
				timeRemaining: "0:00",
				warn: false,
			},
			settings: settings,
			pomoActive: false,
		}
		this.changePomoState(pomoStates.PendingStart)
	}

	componentDidMount() {
		setInterval(this!.sendStatus, 5000)
	}

	handleTimer = (wrk: pLib.Timer, brk: pLib.Timer) => {
		if (!this.state.pomoActive) {
			this.setState({ ...this.state, pomoActive: true })
			this.myPomo = pLib.getPomodoro(wrk, brk)
			this.changePomoState(pomoStates.Pomodoro)

			this.myPomo.on(pomoEvents.PomodoroComplete, this.handlePomoComplete)
			this.myPomo.on(pomoEvents.BreakComplete, this.handleBreakComplete)

			this.myPomo.start()
			setInterval(this.countDown, 50)
		} else {
			this.myPomo.stop()
			this.setState({ ...this.setState, pomoActive: false })
			this.changePomoState(pomoStates.Cancelled)
		}
	}

	countDown = () => {
		let shouldWarn = this.myPomo.PercentRemaining <= +this.state.settings.Inputs[2].value

		this.setState({
			...this.state,
			pomoState: {
				phase: this.myPomo.CurrentState,
				timeRemaining: this.myPomo.Remaining.ToString(false),
				warn: shouldWarn,
			},
		})
	}

	notify = (msg: string): void => {
		if (this.state.settings.Checkboxes[1].checked) {
			CreateNotification({ title: "Time-ato", body: msg })
		}
		toast(msg)
	}

	sendStatus = () => {
		const currentStatus = {
			User: "pashton",
			Date: new Date(),
			State: this.state.pomoState.phase,
			TimeRemaining: this.state.pomoState.timeRemaining,
		}

		sendStatusUpdate(currentStatus)
	}

	changePomoState = (newState: pLib.Enums.PomodoroState): void => {
		const statusChange = {
			User: "pashton",
			Date: new Date(),
			OldState: this.state.pomoState.phase,
			NewState: newState,
		}

		sendStateUpdate(statusChange)
	}

	handlePomoComplete = () => {
		this.notify("Pomodoro completed!")
		this.changePomoState(pomoStates.Break)
	}

	handleBreakComplete = () => {
		this.setState({ ...this.state, pomoActive: false })

		this.notify("Break completed! Get back to work!")
		this.changePomoState(pomoStates.Completed)

		if (this.state.settings.Checkboxes[0].checked) {
			this.myPomo.restart()
			this.setState({ ...this.state, pomoActive: true })
			this.changePomoState(pomoStates.Pomodoro)
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
