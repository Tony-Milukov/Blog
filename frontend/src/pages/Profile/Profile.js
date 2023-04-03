import {useNavigate} from "react-router-dom";
import {userStore} from "../../store/user";
import {useEffect, useState} from "react";
import "./profile.css"

const Profile = () => {
    const token = userStore(state => state.userInfo.token)
    const [user, setUser] = useState(null);

    const [editFirstname, setEditFirstname] = useState(false);
    const [firstName, setFirstName] = useState(null)

    const [lastName, setLastName] = useState(null)
    const [editLastname, setEditLastname] = useState(false);

    const [githubErr, setGithubErr] = useState(false)
    const [editGithubLink, setEditGithubLink] = useState(false);
    const [githubLink, setGithubLink] = useState(null)


    const [instagramErr, setInstagramErr] = useState(false)
    const [editInstagramLink, setEditInstagramLink] = useState(false);
    const [instagramLink, setInstagramLink] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        !token ? navigate("/login") : null
    }, [])

    const getUser = () => {
        if (token) {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
            };
            fetch("http://localhost:5000/user/getUser", requestOptions)
                .then(response => response.text())
                .then(result => {
                    let parsed = JSON.parse(result)
                    if (parsed.id) {
                        setUser(parsed)
                    }
                    console.log(parsed)
                })
                .catch(error => console.log('error', error));

        }
    }
    useEffect(() => {
        getUser()
    }, [])

    const changeFirstName = (e) => {
        e.preventDefault()

        if (editFirstname && user ? (firstName !== user.firstname) : false) {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Content-Type", "application/json");
            let body = JSON.stringify({
                "changeType": "firstname",
                "name": firstName
            });
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: body,
            };

            fetch("http://localhost:5000/user/changeUser", requestOptions)
                .then(response => response.text())
                .then(result => {
                    let parsed = JSON.parse(result)
                    console.log(parsed)
                })
                .catch(error => console.log('error', error));

        }
        setEditFirstname(!editFirstname)

    }
    const changeLastName = (e) => {
        e.preventDefault()
        if (editLastname && user ? (lastName !== user.lastName) : false) {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Content-Type", "application/json");
            let body = JSON.stringify({
                "changeType": "lastname",
                "name": lastName
            });
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: body,
            };

            fetch("http://localhost:5000/user/changeUser", requestOptions)
                .then(response => response.text())
                .then(result => {
                    let parsed = JSON.parse(result)
                    console.log(parsed)
                })
                .catch(error => console.log('error', error));

        }
        setEditLastname(!editLastname)
    }
    const changeGithubLink = (e) => {
        e.preventDefault()
        setGithubErr(false)
        if (editGithubLink && user ? (githubLink !== user.github_link) : false) {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Content-Type", "application/json");
            let body = JSON.stringify({
                "changeType": "github_link",
                "name": githubLink
            });
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: body,
            };

            fetch("http://localhost:5000/user/changeUser", requestOptions)
                .then(response => response.text())
                .then(result => {
                    let parsed = JSON.parse(result)
                    parsed.status === 303 ? setGithubErr(parsed) : null;
                    console.log(parsed)
                })
                .catch(error => console.log('error', error));

        }
        setEditGithubLink(!editGithubLink)
    }
    const changeInstagramLink = (e) => {
        e.preventDefault()
        setInstagramErr(false)
        if (editInstagramLink && user ? (instagramLink !== user.instagram_link) : false) {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Content-Type", "application/json");
            let body = JSON.stringify({
                "changeType": "instagram_link",
                "name": instagramLink
            });
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: body,
            };

            fetch("http://localhost:5000/user/changeUser", requestOptions)
                .then(response => response.text())
                .then(result => {
                    let parsed = JSON.parse(result)
                    parsed.status === 303 ? setInstagramErr(parsed) : null;
                    console.log(parsed)
                })
                .catch(error => console.log('error', error));

        }
        setEditInstagramLink(!editInstagramLink)
    }
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
                                        <div> #{user ? user.username ?? null : null}
                                        </div>
                                        {/*<label className="label label-info">UX Designer</label>*/}
                                    </div>
                                </div>
                                <nav className="side-menu">
                                    <ul className="nav">
                                        <li className="active"><a href="#"><span
                                            className="fa fa-user"></span> Profile</a></li>
                                        <li><a href="#"><span className="fa fa-cog"></span> Settings</a></li>
                                        <li><a href="#"><span className="fa fa-credit-card"></span> Billing</a></li>
                                        <li><a href="#"><span className="fa fa-envelope"></span> Messages</a></li>
                                        <li><a href="user-drive.html"><span className="fa fa-th"></span> Drive</a>
                                        </li>
                                        <li><a href="#"><span className="fa fa-clock-o"></span> Reminders</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="content-panel">
                                <h2 className="title">Profile</h2>
                                <form className="form-horizontal">
                                    <fieldset className="fieldset">
                                        <h3 className="fieldset-title">Personal Info</h3>
                                        <div className="form-group avatar">
                                            <figure className="figure col-md-2 col-sm-3 col-xs-12">
                                                <img className="img-rounded img-responsive"
                                                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                     alt=""/>
                                            </figure>
                                            <div className="form-inline col-md-10 col-sm-9 col-xs-12">
                                                <input type="file" className="file-uploader pull-left"/>
                                                <button type="submit"
                                                        className="btn btn-sm btn-default-alt pull-left">Update
                                                    Image
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-2 col-sm-3 col-xs-12 control-label">User
                                                Name</label>
                                            <div className="col-md-10 col-sm-9 col-xs-12">
                                                <input type="text" readOnly={true} className="form-control"
                                                       value={user ? user.username ?? null : null}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-2 col-sm-3 col-xs-12 control-label">First
                                                Name</label>
                                            <div className="col-md-10 col-sm-9 col-xs-12">
                                                <input onChange={(e) => setFirstName(e.target.value)}
                                                       readOnly={!editFirstname} type="text"
                                                       className="form-control"
                                                       value={firstName !== null ? firstName : user ? user.firstname ?? null : null}/>
                                                <button onClick={(e) => changeFirstName(e)} className={"editBtn"}>

                                                    {!editFirstname ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path
                                                                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                                        </svg>}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-2 col-sm-3 col-xs-12 control-label">Last
                                                Name</label>
                                            <div className="col-md-10 col-sm-9 col-xs-12">
                                                <input onChange={(e) => setLastName(e.target.value)}
                                                       readOnly={!editLastname} type="text"
                                                       className="form-control"
                                                       value={lastName !== null ? lastName : user ? user.lastname ?? null : null}/>
                                                <button onClick={(e) => changeLastName(e)} className={"editBtn"}>

                                                    {!editLastname ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path
                                                                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                                        </svg>}
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
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
                                        <div className="form-group">
                                            <label
                                                className="col-md-2  col-sm-3 col-xs-12 control-label">GitHub</label>
                                            <div className="col-md-10 col-sm-9 col-xs-12">
                                                <input onChange={(e) => setGithubLink(e.target.value)}
                                                       readOnly={!editGithubLink} type="text"
                                                       className="form-control"
                                                       value={githubLink !== null ? githubLink : user ? user.github_link ?? null : null}/>
                                                <button onClick={(e) => changeGithubLink(e)} className={"editBtn"}>

                                                    {!editGithubLink ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path
                                                                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                                        </svg>}
                                                </button>
                                            </div>
                                            <br/>
                                            <br/>
                                            <p className={"help-block"}>{githubErr ? githubErr.message : null}</p>
                                        </div>
                                        <div className="form-group">
                                            <label
                                                className="col-md-2  col-sm-3 col-xs-12 control-label">Instagram</label>
                                            <div className="col-md-10 col-sm-9 col-xs-12">
                                                <input onChange={(e) => setInstagramLink(e.target.value)}
                                                       readOnly={!editInstagramLink} type="text"
                                                       className="form-control"
                                                       value={instagramLink !== null ? instagramLink : user ? user.instagram_link ?? null : null}/>
                                                <button onClick={(e) => changeInstagramLink(e)} className={"editBtn"}>

                                                    {!editInstagramLink ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path
                                                                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                                        </svg>}
                                                </button>
                                            </div>
                                            <br/>
                                            <br/>
                                            <p className={"help-block"}>{instagramErr ? instagramErr.message : null}</p>
                                        </div>
                                    </fieldset>
                                    <hr/>
                                    <div className="form-group">
                                        <div
                                            className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                                        </div>
                                    </div>
                                </form>
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
