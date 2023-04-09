import "./components.css"
import {Link} from "react-router-dom";
const Popup = (props) => {
    return (
        <div id="popup1" className="overlay">
            <div className="popup">
                <h2>{props.header ?? "Error 404"}</h2>
                <div className="content">
                    {props.message ?? "Sorry, something went wrong"}
                </div>
                <Link className={"popup_link"} to={props.link ?? "/"}>Home</Link>

            </div>
        </div>
    )
}
export default Popup
