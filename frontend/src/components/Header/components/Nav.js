import {Link} from "react-router-dom";
import {userStore} from '../../../store/user';
import getUser from "../../../pages/Profile/components/getUser";
import {useEffect, useState} from "react";


const Nav = () => {
    const token = userStore(state => state.userInfo.token)
    const logoutState = userStore((state) => state.logout)
    const [username, setUsername] = useState()
    const categories = ["programming", "lifestyle", "family", "management", "Travel", "Work"];
    useEffect(() => {
        const fetch = async () => {
            const user = await getUser(token)
            if (!user) {
                logoutState()
            } else {
                setUsername(user.username);
            }
        }
        fetch()
    }, [token])
    return (
        <ul className="header__nav">
            <li className="current"><Link to={"/"}>Home</Link></li>
            <li className="has-children">
                <a title="">Categories</a>
                <ul className="sub-menu">
                    {categories.map(category => <li><Link to={`articles/category/${category}`}>{category}</Link></li>)}
                </ul>
            </li>

            {token ? <>
                    <li className="has-children">
                        <a href="#0" title="">Your Blog</a>
                        <ul className="sub-menu">
                            <li><Link to={"/newTextArticle"}>New Article</Link></li>
                            <li><Link to={`/users/${username}`}>Account</Link></li>
                        </ul>
                    </li>
                    <li><Link to={"profile"}>Settings</Link></li>
                </>
                : null}
            <li>{!token ? <Link className={"authBtn"} to={"/login"} title=""><b>Login</b></Link> :
                <Link to={"/login"} className={"authBtn"} onClick={() => {
                    logoutState();
                }}>Logout</Link>}</li>
        </ul>
    )
}
export default Nav
