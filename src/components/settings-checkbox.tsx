import { PomoCheckboxSetting } from "../helpers/settings-helpers"

export const SettingsCheckbox = ({ text, id, checked }: PomoCheckboxSetting) => {
	return (
		<div className="setting">
			<label>{text}</label>
			<input type="checkbox" id={id} defaultChecked={checked} />
		</div>
	)
}
