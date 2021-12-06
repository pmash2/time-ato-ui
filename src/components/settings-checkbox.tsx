type Props = {
    text: string
}

const SettingsCheckbox = ({text}: Props) => {
    return (
        <div>
            <input type="checkbox"/>
            <label>{ text }</label>
        </div>
    )
}

export { SettingsCheckbox }