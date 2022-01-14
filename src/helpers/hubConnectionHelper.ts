import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr"
import { getConfig } from "../helpers/app-config-helper"

export const getHubConnection = (hubName: string) => {
	const _configs = getConfig()

	return (
		new HubConnectionBuilder()
			//TODO: better handle url
			.withUrl(`${_configs.NotificationsUrl}/hubs/${hubName}`, {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build()
	)
}
