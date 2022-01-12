import { useState } from "react"
import Popup from "reactjs-popup"
import "../style/modal.css"
const package_json = require("../../package.json")

const About = () => {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false)
	const openModal = (): void => setOpen(true)
	const version = package_json.version

	return (
		<div>
			<button onClick={openModal}>About</button>
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
					<h1 className="modalHeader">Special Thanks!</h1>
					<div className="popup-content popup-centered">
						Dave D.
						<br />
						Mike W.
						<h4>v{version}</h4>
						Tomato icon provided by AomAm
						<br />
						<cite>https://www.flaticon.com/authors/aomam</cite>
					</div>
				</div>
			</Popup>
		</div>
	)
}

export { About }
