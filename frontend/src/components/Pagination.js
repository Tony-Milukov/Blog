import {Link, useLocation} from "react-router-dom";

const PaginationController = ({page}) => {
    const location = useLocation()
    const path = location.pathname.replace(/page\/\d/,"page/")
    return  <div className="paginationContainer">
        <Link to={`${path}${parseInt(page) !== 1 ? parseInt(page)-1: page}`}>&laquo; </Link>

        <Link to={`${path}${parseInt(page)+ 1}`}>&raquo;</Link>
    </div>
}
export default PaginationController
