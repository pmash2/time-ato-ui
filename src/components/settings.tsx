import { useState } from "react"
import Popup from "reactjs-popup"
import '../style/modal.css'
import { SettingsInput } from "./settings-input"
import { SettingsCheckbox } from "./settings-checkbox"

const Settings = () => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
        <div>
            <button type="button" onClick={() => setOpen(o => !o)}>
                Settings
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} position="center center">
                <div className="modal">
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>

                    <h2>Application Settings</h2>
                    <SettingsInput text="Default Pomodoro Length" />
                    <SettingsInput text="Default Break Length" />
                    <SettingsInput text="Warning Threshold (%)" />

                    <SettingsCheckbox text="Auto-loop pomodoros" />
                </div>
            </Popup>
        </div>
    )
}

export { Settings }