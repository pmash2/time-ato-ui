import { useState } from "react"
import Popup from "reactjs-popup"
import "../style/about.css"
import "../style/modal.css"
const package_json = require("../../package.json")

const About = () => {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false)
	const version = package_json.version

	return (
		<div>
			<button type="button" onClick={() => setOpen((o) => !o)}>
				About
			</button>
			<Popup open={open} closeOnDocumentClick onClose={closeModal} position="center center">
				<div className="modal">
					<h1 className="centered">Special Thanks!</h1>
					<p className="thanksList centered">
						Dave D.
						<br />
						Mike W.
					</p>
					<h4 className="centered">v{version}</h4>
					<p className="centered">
						Tomato icon provided by AomAm
						<br />
						<cite>https://www.flaticon.com/authors/aomam</cite>
					</p>
				</div>
			</Popup>
		</div>
	)
}

export { About }
