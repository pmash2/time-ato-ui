export interface PomoInputSetting {
	text: string
	id: string
	value: string
	tooltip: string
}
export interface PomoCheckboxSetting {
	text: string
	id: string
	checked: boolean
	tooltip: string
}

export interface PomoSettings {
	Inputs: PomoInputSetting[]
	Checkboxes: PomoCheckboxSetting[]
}

export const CurrentSettingsOptions: PomoSettings = {
	Inputs: [
		{
			text: "Default Pomodoro Length",
			id: "default-pomo-length",
			value: "",
			tooltip: "Default length of pomodoro phase",
		},
		{
			text: "Default Break Length",
			id: "default-break-length",
			value: "",
			tooltip: "Default length of break phase",
		},
		{
			text: "Warning Threshold (%)",
			id: "warn-threshold",
			value: "",
			tooltip: "Percent complete at which warning of phase should occur",
		},
	],
	Checkboxes: [
		{
			text: "Auto-loop pomodoros",
			id: "auto-loop",
			checked: false,
			tooltip: "Should a new pomodoro phase start after current one completes?",
		},
		{
			text: "Show phase change notifications",
			id: "show-notifications",
			checked: false,
			tooltip: "When a pomodoro or break completes, should a notification be sent to the desktop?",
		},
	],
}

export const LoadSettings = (_settings: PomoSettings = CurrentSettingsOptions): PomoSettings => {
	let newInputSettings = _settings.Inputs.map((item) => GetInputSetting(item))
	let newCheckboxSettings = _settings.Checkboxes.map((item) => GetCheckboxSetting(item))

	return {
		Inputs: newInputSettings,
		Checkboxes: newCheckboxSettings,
	}
}

export const SaveSettings = (_settings: PomoSettings): PomoSettings => {
	let newInputSettings = _settings.Inputs.map((item) => saveInputItem(item))
	let newCheckboxSettings = _settings.Checkboxes.map((item) => saveCheckboxItem(item))

	return {
		Inputs: newInputSettings,
		Checkboxes: newCheckboxSettings,
	}
}

const saveInputItem = (item: PomoInputSetting): PomoInputSetting => {
	let val = document.getElementById(item.id) as HTMLInputElement
	let valToSave = val.value

	localStorage.setItem(item.id, valToSave)

	return {
		...item,
		value: valToSave,
	}
}

const saveCheckboxItem = (item: PomoCheckboxSetting): PomoCheckboxSetting => {
	let val = document.getElementById(item.id) as HTMLInputElement
	let valToSave = val.checked.toString()

	localStorage.setItem(item.id, valToSave)

	return {
		...item,
		checked: val.checked,
	}
}

const GetInputSetting = (_setting: PomoInputSetting): PomoInputSetting => {
	let val = localStorage.getItem(_setting.id)!

	return {
		..._setting,
		value: val,
	}
}

const GetCheckboxSetting = (_setting: PomoCheckboxSetting): PomoCheckboxSetting => {
	let val = localStorage.getItem(_setting.id) === "true" ? true : false

	return {
		..._setting,
		checked: val,
	}
}
