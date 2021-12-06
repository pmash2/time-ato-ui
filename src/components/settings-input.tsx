type Props = {
    text: string
}

const SettingsInput = ({text}: Props) => {
    return (
        <div>
            <label>{ text }</label>
            <input/>
        </div>
    )
}

export { SettingsInput }