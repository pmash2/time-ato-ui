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
import "react-toastify/dist/ReactToastify.css"

type PomodoroState = {
	phase: string
	timeRemaining: string
	warn: boolean
}
type Props = {
	settings: PomoSettings
}
type MyState = {
	pomoState: PomodoroState
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

		const statusChange = {
			User: "pashton",
			Date: new Date(),
			OldState: "",
			NewState: pomoStates.PendingStart,
		}
		sendStateUpdate(statusChange)
	}

	componentDidMount() {
		setInterval(this!.sendStatus, 5000)
	}

	handleTimer = (wrk: pLib.Timer, brk: pLib.Timer) => {
		if (!this.state.pomoActive) {
			this.setState({ ...this.state, pomoActive: true })
			this.myPomo = pLib.getPomodoro(wrk, brk)

			const statusChange = {
				User: "pashton",
				Date: new Date(),
				OldState: pomoStates.PendingStart,
				NewState: pomoStates.Pomodoro,
			}
			sendStateUpdate(statusChange)

			this.myPomo.on(pomoEvents.PomodoroComplete, () => {
				this.notify("Pomodoro completed!")

				const statusChange = {
					User: "pashton",
					Date: new Date(),
					OldState: pomoStates.Pomodoro,
					NewState: pomoStates.Break,
				}
				sendStateUpdate(statusChange)
			})

			this.myPomo.on(pomoEvents.BreakComplete, () => {
				this.setState({ ...this.state, pomoActive: false })

				this.notify("Break completed! Get back to work!")

				let statusChange = {
					User: "pashton",
					Date: new Date(),
					OldState: pomoStates.Break,
					NewState: pomoStates.Completed,
				}
				sendStateUpdate(statusChange)

				if (this.state.settings.Checkboxes[0].checked) {
					this.myPomo.restart()
					this.setState({ ...this.state, pomoActive: true })

					statusChange.OldState = pomoStates.Completed
					statusChange.NewState = pomoStates.Pomodoro
					sendStateUpdate(statusChange)
				}
			})

			this.myPomo.start()
			setInterval(this.countDown, 50)
		} else {
			this.myPomo.stop()
			this.setState({ ...this.setState, pomoActive: false })

			const statusChange = {
				User: "pashton",
				Date: new Date(),
				OldState: pomoStates.Pomodoro,
				NewState: pomoStates.Cancelled,
			}
			sendStateUpdate(statusChange)
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

	render() {
		return (
			<div>
				<div id="notifications">
					<StatusNotification />
					<Logo spinning={this.state.pomoActive} />
				</div>
				<Pomodoro pomodoroState={this.state.pomoState} />
				<PomodoroInput onClick={this.handleTimer} pomoRunning={this.state.pomoActive} />
				<ToastContainer />
			</div>
		)
	}
}
