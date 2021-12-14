import React, { Component } from "react"
import * as pLib from "@pmash2/pomo-timer-lib"
import { Pomodoro } from "./pomodoro"
import { PomodoroInput } from "./pomodoro-input"
import { PomoSettings } from "../settings-helpers"
import { CreateNotification } from "../notifications"
import { Logo } from "./logo"

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
	}

	handleTimer = (wrk: pLib.Timer, brk: pLib.Timer) => {
		if (!this.state.pomoActive) {
			this.setState({ ...this.state, pomoActive: true })
			this.myPomo = pLib.getPomodoro(wrk, brk)

			this.myPomo.on(pLib.EmitString.PomodoroComplete, () => {
				let title = "Time-ato" as string
				let body = "Pomodoro completed!" as string
				CreateNotification({ title, body })
			})

			this.myPomo.on(pLib.EmitString.BreakComplete, () => {
				this.setState({ ...this.state, pomoActive: false })

				let title = "Time-ato" as string
				let body = "Break completed! Get back to work!" as string
				CreateNotification({ title, body })

				if (this.state.settings.Checkboxes[0].checked) {
					this.myPomo.restart()
					this.setState({ ...this.state, pomoActive: true })
				}
			})

			this.myPomo.start()
			setInterval(this.countDown, 50)
		} else {
			this.myPomo.stop()
			this.setState({ ...this.setState, pomoActive: false })
		}
	}

	countDown = () => {
		let shouldWarn = this.getRemainingPercent() < +this.state.settings.Inputs[2].value

		this.setState({
			...this.state,
			pomoState: {
				phase: this.myPomo.CurrentState,
				timeRemaining: this.myPomo.Remaining.ToString(false),
				warn: shouldWarn,
			},
		})
	}

	getRemainingPercent = (): number => {
		let totalTime = pLib.TimeUtilities.TimeToMs(this.myPomo.OriginalTime)
		let remaining = pLib.TimeUtilities.TimeToMs(this.myPomo.Remaining)

		return Math.round((remaining / totalTime) * 100)
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
