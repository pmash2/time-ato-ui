interface Props {
	title: string
	body: string
}

export const CreateNotification = ({ title, body }: Props) => {
	new Notification(title, { body: body })
}

export const RequestPermission = () => {
	Notification.requestPermission().then((result) => {
		console.log(`Given permission? ${result}`)
	})
}
