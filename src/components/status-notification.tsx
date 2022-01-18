import React, { ReactElement, useEffect, useState } from "react"
import { TextNotificationBox } from "./text-notification-box"
import { HubConnection } from "@microsoft/signalr"
import { getHubConnection } from "../helpers/hubConnectionHelper"

interface PomoStateChange {
	User: string
	Date: Date
	OldState: string
	NewState: string
}

interface Props {
	onFailedConnection: () => void
}

const pomoStateToString = (st: PomoStateChange): string =>
	`Last update (${st.Date}): ${st.User} completed ${st.OldState}, now doing ${st.NewState}`

export const StatusNotification = ({ onFailedConnection }: Props): ReactElement => {
	const [connection, setConnection] = useState<null | HubConnection>(null)
	const [notification, setNotification] = useState("")

	useEffect(() => {
		const connect = getHubConnection("statusChanges")
		setConnection(connect)
	}, [])

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(() => {
					setNotification("Connected")
					connection.on("StatusChange", (msg) => {
						const msgJson = JSON.parse(msg) as PomoStateChange
						setNotification(pomoStateToString(msgJson))
					})
				})
				.catch((error) => {
					setNotification("")
					onFailedConnection()
					console.log(`Error: ${error}`)
				})
		}
	}, [connection, onFailedConnection])

	return <TextNotificationBox text={notification} />
}
