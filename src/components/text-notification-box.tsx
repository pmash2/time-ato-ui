import React, { ReactElement } from "react"

type Props = {
	text: string
}

export const TextNotificationBox = ({ text }: Props): ReactElement => (
	<span id="notifyBox">{text}</span>
)
