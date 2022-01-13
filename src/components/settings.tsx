import { useState } from "react"
import Popup from "reactjs-popup"
import "../style/modal.css"
import { SettingsInput } from "./settings-input"
import { SettingsCheckbox } from "./settings-checkbox"
import { PomoSettings } from "../settings-helpers"
import "../style/settings.css"

interface Props {
	settings: PomoSettings
	onSave: () => void
}

export const Settings = ({ settings, onSave }: Props) => {
	const [open, setOpen] = useState(false)
	const closeModal = (): void => setOpen(false)
	const openModal = (): void => setOpen(true)

	return (
		<div>
			<button onClick={openModal}>Settings</button>
			<Popup
				open={open}
				closeOnDocumentClick
				onClose={closeModal}
				position="center center"
				modal
			>
				<div className="modal">
					<button className="close" onClick={closeModal}>
						&times;
					</button>
					<span className="modalHeader">Application Settings</span>

					{settings.Inputs.map((lbl, i) => (
						<SettingsInput {...lbl} key={i} />
					))}

					{settings.Checkboxes.map((lbl, i) => (
						<SettingsCheckbox {...lbl} key={i} />
					))}

					<button onClick={onSave}>Save</button>
				</div>
			</Popup>
		</div>
	)
}
