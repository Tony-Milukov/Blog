import {Link} from "react-router-dom";
import {userStore} from "../../store/user";
import {useEffect, useState} from "react";
import "./profile.css"
import ChangeUserDataInput from "./components/ChangeUserDataInput";
import getUser from "../../components/API/requests/user/getUser";
import useAuth from "../../hooks/useAuth";
import updateAvatar from "../../components/API/requests/user/updateAvatar";

const Profile = () => {
    const token = userStore(state => state.userInfo.token)
    useAuth(token)

    const [user, setUser] = useState(null);
    const [avatarLink,setAvatarLink] = useState(null)
    const refresh = async () => {
        const user = await getUser(token)
        setUser(user)
        setAvatarLink(`http://localhost:5000/${user.avatar}`)
    }
    useEffect(() => {
        refresh()
    }, [])
    const update = async (e)=> {
        console.log(await (await updateAvatar(e.target.files[0],token)))
        refresh()
    }
    if (token && user) {
        return <>

            <div className="container">
                <div className="view-account">
                    <section className="module">
                        <div className="module-inner">

                            <div className="side-bar">
                                <div className="user-info">
                                    <img className=" img-profile img-circle img-responsive center-block"
                                         src={avatarLink} alt=""/>
                                    <div className={"uploadImgage"}>
                                        <label className={"uploadAvatar"} htmlFor="file-upload">Choose image</label>
                                        <input id="file-upload" onChange={(e) => update(e)} accept=".jpg, .jpeg, .png" aria-label="Upload file" type="file"/>
                                    </div>
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
        </>
    }
    else {
      return  <div className="container">
        </div>
    }
}

export default Profile
