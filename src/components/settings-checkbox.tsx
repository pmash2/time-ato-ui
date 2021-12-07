import { PomoCheckboxSetting } from "../settings-helpers"

const SettingsCheckbox = ({text, id, checked}: PomoCheckboxSetting) => {
    return (
        <div>
            <input type="checkbox" id={ id } defaultChecked={ checked }/>
            <label>{ text }</label>
        </div>
    )
}

export { SettingsCheckbox }