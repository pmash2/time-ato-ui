type Props = {
    text: string
    id: string
}

const SettingsInput = ({text, id}: Props) => {
    return (
        <div>
            <label>{ text }</label>
            <input id={ id }/>
        </div>
    )
}

export { SettingsInput }