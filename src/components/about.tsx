import { useState } from "react"
import Popup from "reactjs-popup"
import '../style/about.css'

const About = () => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
        <div>
            <button type="button" onClick={() => setOpen(o => !o)}>
                About
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal} position="center center">
                <div className="aboutModal">
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                    <h2>Special Thanks!</h2>
                    <ul className="thanksList">
                        <li><h4>Dave D.</h4></li>
                        <li><h4>Mike W.</h4></li> 
                    </ul>
                </div>
            </Popup>
        </div>
    )
}

export { About }