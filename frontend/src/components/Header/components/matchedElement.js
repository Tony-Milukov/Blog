import { Link } from "react-router-dom";
const MatchedElement = ({value,type,title,handler}) => {
    return <>
            <div className="matchedElem">
                <Link to={`/${type === "user" ? "users" : "articles"}/${value}`} onClick={handler} >{title ?? value} ({type}) </Link>
            </div>
            </>
}
export default MatchedElement
