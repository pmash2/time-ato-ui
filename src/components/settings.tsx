import { useState } from "react"
import Popup from "reactjs-popup"
import '../style/modal.css'
import { SettingsInput } from "./settings-input"
import { SettingsCheckbox } from "./settings-checkbox"

const Settings = () => {
    const [open, setOpen] = useState(false)
    const closeModal = (): void => setOpen(false)
    const settingsOptions = {
        "Inputs": [
            {
                "text": "Default Pomodoro Length",
                "id": "default-pomo-length"
            },
            {
                "text": "Default Break Length",
                "id": "default-break-length"
            },
            {
                "text": "Warning Threshold (%)",
                "id": "warn-threshold"
            },
        ],
        "Checkboxes": [
            {
                "text": "Auto-loop pomodoros",
                "id": "auto-loop"
            }
        ]
    }

    const saveSettings = (): void => {
        settingsOptions.Inputs.map((item) => saveItem(item.id, false))
        settingsOptions.Checkboxes.map((item) => saveItem(item.id, true))

        alert("Settings saved!")
    }

    const saveItem = (itemId: string, isCheckable: boolean): void => {
        let val = document.getElementById(itemId) as HTMLInputElement
        let valToSave = isCheckable ? val.checked.toString() : val.value

        localStorage.setItem(itemId, valToSave)
    }

    return (
        <div>
            <button type="button" onClick={ () => setOpen(o => !o) }>
                Settings
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} position="center center">
                <div className="modal">
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>

                    <h2>Application Settings</h2>

                    {settingsOptions.Inputs.map((lbl, i) =>
                        <SettingsInput {...lbl} key={i} />
                    )}

                    {settingsOptions.Checkboxes.map((lbl, i) =>
                        <SettingsCheckbox {...lbl} key={i} />
                    )}

                    <button onClick={ () => saveSettings() }>
                        Save
                    </button>
                </div>
            </Popup>
        </div>
    )
}

export { Settings }