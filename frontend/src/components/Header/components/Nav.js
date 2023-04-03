import {Link, useNavigate} from "react-router-dom";
import {userStore} from '../../../store/user';


const Nav = () => {
    const token = userStore(state => state.userInfo.token)
    const logoutState = userStore((state) => state.logout)
    return (
        <ul className="header__nav">
            <li className="current"><a href="index.html" title="">Home</a></li>
            <li className="has-children">
                <a href="#0" title="">Categories</a>
                <ul className="sub-menu">
                    <li><a href="category.html">Lifestyle</a></li>
                    <li><a href="category.html">Health</a></li>
                    <li><a href="category.html">Family</a></li>
                    <li><a href="category.html">Management</a></li>
                    <li><a href="category.html">Travel</a></li>
                    <li><a href="category.html">Work</a></li>
                </ul>
            </li>
            <li className="has-children">
                <a href="#0" title="">Blog</a>
                <ul className="sub-menu">
                    <li><a href="single-video.html">Video Post</a></li>
                    <li><a href="single-audio.html">Audio Post</a></li>
                    <li><a href="single-gallery.html">Gallery Post</a></li>
                    <li><a href="single-standard.html">Standard Post</a></li>
                </ul>
            </li>
            {token ? <li><Link to={"profile"}>Profile</Link></li> : null}
            <li><a href="about.html" title="">About</a></li>
            <li><a href="contact.html" title="">Contact</a></li>
            <li>{!token ? <Link className={"authBtn"} to={"/login"} title=""><b>Login</b></Link> :
                <Link to={"/login"} className={"authBtn"} onClick={() => {
                    logoutState();
                }}>Logout</Link>}</li>
        </ul>
    )
}
export default Nav
