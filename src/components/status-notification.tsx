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

const pomoStateToString = (st: PomoStateChange): string =>
	`Last update (${st.Date}): ${st.User} completed ${st.OldState}, now doing ${st.NewState}`

export const StatusNotification = (): ReactElement => {
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
					setNotification("Error connecting to server")
					console.log(`Error: ${error}`)
				})
		}
	}, [connection])

	return <TextNotificationBox text={notification} />
}
