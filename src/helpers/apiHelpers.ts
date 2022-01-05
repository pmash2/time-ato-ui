// TODO: Consolidate these - new package?
interface Status {
	User: string
	Date: Date
	OldStatus: string
	NewStatus: string
}

export const sendStatusUpdate = async (newStatus: Status): Promise<void> => {
	const hdr = new Headers()
	hdr.append("Content-Type", "application/json")

	const rqstOpts: RequestInit = {
		method: "POST",
		headers: hdr,
		body: JSON.stringify(newStatus),
		redirect: "follow",
	}

	// TODO: Hard-coded URL...
	fetch("http://127.0.0.1:2002/status", rqstOpts).catch((error) => console.log("error", error))
}
