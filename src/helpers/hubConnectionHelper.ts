import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { getConfig } from "../helpers/app-config-helper"

export const getHubConnection = (hubName: string): HubConnection | null => {
	const _configs = getConfig()

	if (_configs.NotificationsUrl.length > 0) {
		const notificationHubUrl = `${_configs.NotificationsUrl}/hubs/${hubName}`

		return new HubConnectionBuilder()
			.withUrl(notificationHubUrl, {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build()
	} else {
		return null
	}
}
