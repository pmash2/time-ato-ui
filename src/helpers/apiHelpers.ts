import { getConfig } from "./app-config-helper"

// TODO: Consolidate these - new package?
interface PomoStateChange {
	User: string
	Date: Date
	OldState: string
	NewState: string
}

// TODO: Consolidate these - new package?
interface Status {
	User: string
	Date: Date
	State: string
	TimeRemaining: string
}

const _configs = getConfig()

export const sendStateUpdate = async (stateUpdate: PomoStateChange): Promise<void> => {
	if (_configs.ApiUrl.length > 0) {
		const hdr = new Headers()
		hdr.append("Content-Type", "application/json")

		const rqstOpts: RequestInit = {
			method: "POST",
			headers: hdr,
			body: JSON.stringify(stateUpdate),
			redirect: "follow",
		}

		fetch(`${_configs.ApiUrl}/state`, rqstOpts).catch((error) => console.log("error", error))
	}
}

export const sendStatusUpdate = async (statusUpdate: Status): Promise<void> => {
	if (_configs.ApiUrl.length > 0) {
		const hdr = new Headers()
		hdr.append("Content-Type", "application/json")

		const rqstOpts: RequestInit = {
			method: "POST",
			headers: hdr,
			body: JSON.stringify(statusUpdate),
			redirect: "follow",
		}

		fetch(`${_configs.ApiUrl}/status`, rqstOpts).catch((error) => console.log("error", error))
	}
}
