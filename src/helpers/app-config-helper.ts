import { AppConfig } from "../types/app-config"

export const getConfig = (): AppConfig => {
	let _config: AppConfig = {
		ApiUrl: process.env.REACT_APP_API_URL ?? "",
		NotificationsUrl: process.env.REACT_APP_NOTIFY_URL ?? "",
	}

	return _config
}
