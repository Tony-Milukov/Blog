import {Link, useNavigate} from "react-router-dom";
import {userStore} from "../../store/user";
import {useEffect, useState} from "react";
import "./profile.css"
import ChangeUserDataInput from "./components/ChangeUserDataInput";
import getUser from "./components/getUser";

const Profile = () => {
    const token = userStore(state => state.userInfo.token)

    const navigate = useNavigate()
    useEffect(() => {
        !token ? navigate("/login") : null
    }, [])

    const [user, setUser] = useState(null);
    const refresh = async () => {
        const user = await getUser(token)
        setUser(user)
    }
    useEffect(() => {
        refresh()
    }, [])

    if (token && user) {
        return <>

            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
            <div className="container">
                <div className="view-account">
                    <section className="module">
                        <div className="module-inner">
                            <div className="side-bar">
                                <div className="user-info">
                                    <img className="img-profile img-circle img-responsive center-block"
                                         src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                    <div className={"usernameMain"}>
                                        <Link to={`/users/${user.username}`}> @{user ? user.username ?? null : null}</Link>
                                        <label className="label label-info">{user.job}</label>
                                    </div>
                                </div>
                                <nav className="side-menu">
                                    <ul className="nav">
                                        <li className="active"><a href="#"><span
                                            className="fa fa-user"></span> Profile</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="content-panel">
                                <h2 className="title">Profile</h2>
                                <div className="form-horizontal">
                                    <fieldset className="fieldset">
                                        <h3 className="fieldset-title">Personal Info</h3>
                                    </fieldset>
                                    <ChangeUserDataInput user={user} changeType={"firstname"} title={"First Name"}/>
                                    <ChangeUserDataInput user={user} changeType={"lastname"} title={"Last Name"}/>
                                    <ChangeUserDataInput isTextArea={true} user={user} changeType={"description"} title={"Description"}/>
                                    <ChangeUserDataInput handler={refresh} user={user} changeType={"job"} title={"Job"}/>

                                    <fieldset className="fieldset">
                                        <h3 className="fieldset-title">Contact Info</h3>
                                        <div className="form-group">
                                            <label
                                                className="col-md-2  col-sm-3 col-xs-12 control-label">Email</label>
                                            <div className="col-md-10 col-sm-9 col-xs-12">
                                                <input readOnly={true} type="email" className="form-control"
                                                       value={user ? user.email : null}/>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <ChangeUserDataInput  user={user} changeType={"github_link"} title={"Github Link"}/>
                                    <ChangeUserDataInput user={user} changeType={"instagram_link"} title={"Instagram Link"}/>

                                    <hr/>
                                    <div className="form-group">
                                        <div
                                            className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
            <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
            <script src="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <script type="text/javascript"/>
        </>
    }
}

export default Profile
