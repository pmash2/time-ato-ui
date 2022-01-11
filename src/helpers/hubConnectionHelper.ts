import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr"

export const getHubConnection = (hubName: string) => {
	return (
		new HubConnectionBuilder()
			//TODO: better handle url
			.withUrl(`http://localhost:40597/hubs/${hubName}`, {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build()
	)
}
