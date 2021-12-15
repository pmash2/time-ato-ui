import { PomoInputSetting } from "../settings-helpers"
import Popup from "reactjs-popup"

const SettingsInput = ({ text, id, value, tooltip }: PomoInputSetting) => {
	return (
		<div className="setting">
			<label>{text}</label>
			<Popup trigger={<input id={id} defaultValue={value} />} position="right center" className="tooltip">
				{tooltip}
			</Popup>
		</div>
	)
}

export { SettingsInput }
