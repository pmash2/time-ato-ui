type Props = {
    text: string,
    id: string
}

const SettingsCheckbox = ({text, id}: Props) => {
    return (
        <div>
            <input type="checkbox" id={ id }/>
            <label>{ text }</label>
        </div>
    )
}

export { SettingsCheckbox }