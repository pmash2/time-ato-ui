import React, { ReactElement, useEffect, useState } from "react"
import { HubConnection } from "@microsoft/signalr"
import { TextNotificationBox } from "./text-notification-box"
import { getHubConnection } from "../helpers/hubConnectionHelper"

interface Props {
	onFailedConnection: () => void
}

export const ServerTime = ({ onFailedConnection }: Props): ReactElement => {
	const [connection, setConnection] = useState<null | HubConnection>(null)
	const [statusMsg, setStatusMsg] = useState("")

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
					setStatusMsg("")
					onFailedConnection()
					console.log(`Error: ${error}`)
				})
		}
	}, [connection, onFailedConnection])

	return (
		<div>
			<TextNotificationBox text={statusMsg} />
		</div>
	)
}
