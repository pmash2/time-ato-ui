// TODO: Consolidate these - new package?
interface PomoStateChange {
	User: string
	Date: Date
	OldState: string
	NewState: string
}

export const sendStateUpdate = async (stateUpdate: PomoStateChange): Promise<void> => {
	const hdr = new Headers()
	hdr.append("Content-Type", "application/json")

	const rqstOpts: RequestInit = {
		method: "POST",
		headers: hdr,
		body: JSON.stringify(stateUpdate),
		redirect: "follow",
	}

	// TODO: Hard-coded URL...
	fetch("http://127.0.0.1:2002/state", rqstOpts).catch((error) => console.log("error", error))
}
