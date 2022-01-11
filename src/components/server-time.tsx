import React, { ReactElement, useEffect, useState } from "react"
import { HubConnection } from "@microsoft/signalr"
import { TextNotificationBox } from "./textNotificationBox"
import { getHubConnection } from "../helpers/hubConnectionHelper"

export const ServerTime = (): ReactElement => {
	const [connection, setConnection] = useState<null | HubConnection>(null)
	const [statusMsg, setStatusMsg] = useState("Not connected to server")

	useEffect(() => {
		const connect = getHubConnection("serverTime")
		setConnection(connect)
	}, [])

	useEffect(() => {
		if (connection) {
			setStatusMsg("Connecting to server...")
			connection
				.start()
				.then(() => {
					setStatusMsg("Connected")
					connection.on("ServerTime", (msg) => {
						setStatusMsg(msg)
					})
				})
				.catch((error) => {
					setStatusMsg("Error connecting to server")
					console.log(`Error: ${error}`)
				})
		}
	}, [connection])

	return (
		<div>
			<TextNotificationBox text={`Current Time: ${statusMsg}`} />
		</div>
	)
}
