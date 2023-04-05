import logo from "../../logo.svg"
import Nav from "./components/Nav"
import "./header.css"
import {Link} from "react-router-dom";

const Header = () => {

    return (<>
        <header className="header">
            <div className="header__content row">
                <div className="header__logo">
                    <Link to={"/"} className="logo">
                        <img src={logo} alt="Homepage"/>
                    </Link>
                </div>

                <ul className="header__social">
                    <li>
                        <a href="/"><i className="fa fa-facebook" aria-hidden="true"/></a>
                    </li>
                    <li>
                        <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="/"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                    </li>
                </ul>

                <a className="header__search-trigger" href="#0"></a>

                <div className="header__search">

                    <form role="search" method="get" className="header__search-form" action="#">
                        <label>
                            <span className="hide-content">Search for:</span>
                            <input type="search" className="search-field" placeholder="Type Keywords" value="" name="s"
                                   title="Search for:" autoComplete="off"/>
                        </label>
                        <input type="submit" className="search-submit" value="Search"/>
                    </form>

                    <a href="#0" title="Close Search" className="header__overlay-close">Close</a>

                </div>


                <a className="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>

                <nav className="header__nav-wrap">

                    <h2 className="header__nav-heading h6">Site Navigation</h2>

                    <Nav/>

                    <a href="#0" title="Close Menu" className="header__overlay-close close-mobile-menu">Close</a>

                </nav>

            </div>
        </header>
    </>)

}
export default Header
