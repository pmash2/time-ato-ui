import { PomoInputSetting } from "../settings-helpers"

const SettingsInput = ({ text, id, value }: PomoInputSetting) => {
	return (
		<div>
			<label>{text}</label>
			<input id={id} defaultValue={value} />
		</div>
	)
}

export { SettingsInput }
