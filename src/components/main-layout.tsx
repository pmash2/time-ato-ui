import React, { Component } from "react"
import * as pLib from "@pmash2/pomo-timer-lib"
import { Pomodoro } from "./pomodoro"
import { PomodoroInput } from "./pomodoro-input"
import { PomoSettings } from "../settings-helpers"
import { CreateNotification } from "../notifications"
import { Logo } from "./logo"
import { sendStatusUpdate } from "../helpers/apiHelpers"

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

const getPercentofTotal = (partial: pLib.Time, total: pLib.Time): number => {
	let msPartial = pLib.TimeUtilities.TimeToMs(partial)
	let msTotal = pLib.TimeUtilities.TimeToMs(total)

	return Math.round((msPartial / msTotal) * 100)
}

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
		// TODO: Use enum when available for status
		const statusChange = {
			User: "pashton",
			Date: new Date(),
			OldStatus: "",
			NewStatus: "Pending Start",
		}
		sendStatusUpdate(statusChange)
	}

	handleTimer = (wrk: pLib.Timer, brk: pLib.Timer) => {
		if (!this.state.pomoActive) {
			this.setState({ ...this.state, pomoActive: true })
			this.myPomo = pLib.getPomodoro(wrk, brk)

			// TODO: Use enum when available for status
			const statusChange = {
				User: "pashton",
				Date: new Date(),
				OldStatus: "Pending Start",
				NewStatus: "Pomodoro",
			}
			sendStatusUpdate(statusChange)

			this.myPomo.on(pLib.EmitString.PomodoroComplete, () => {
				this.notify("Pomodoro completed!")
				// TODO: Use enum when available for status
				const statusChange = {
					User: "pashton",
					Date: new Date(),
					OldStatus: "Pomodoro",
					NewStatus: "Break",
				}
				sendStatusUpdate(statusChange)
			})

			this.myPomo.on(pLib.EmitString.BreakComplete, () => {
				this.setState({ ...this.state, pomoActive: false })

				this.notify("Break completed! Get back to work!")

				// TODO: Use enum when available for status
				let statusChange = {
					User: "pashton",
					Date: new Date(),
					OldStatus: "Break",
					NewStatus: "Completed",
				}
				sendStatusUpdate(statusChange)

				if (this.state.settings.Checkboxes[0].checked) {
					this.myPomo.restart()
					this.setState({ ...this.state, pomoActive: true })

					// TODO: Use enum when available for status
					statusChange.OldStatus = "Completed"
					statusChange.NewStatus = "Pomodoro"
					sendStatusUpdate(statusChange)
				}
			})

			this.myPomo.start()
			setInterval(this.countDown, 50)
		} else {
			this.myPomo.stop()
			this.setState({ ...this.setState, pomoActive: false })
			// TODO: Use enum when available for status
			const statusChange = {
				User: "pashton",
				Date: new Date(),
				OldStatus: "Pomodoro",
				NewStatus: "Cancelled",
			}
			sendStatusUpdate(statusChange)
		}
	}

	countDown = () => {
		let shouldWarn =
			getPercentofTotal(this.myPomo.Remaining, this.myPomo.OriginalTime) <=
			+this.state.settings.Inputs[2].value

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
	}

	render() {
		return (
			<div>
				<Logo spinning={this.state.pomoActive} />
				<Pomodoro pomodoroState={this.state.pomoState} />
				<PomodoroInput onClick={this.handleTimer} pomoRunning={this.state.pomoActive} />
			</div>
		)
	}
}
