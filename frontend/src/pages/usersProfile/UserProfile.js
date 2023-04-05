import "./userProfile.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SocialLink from "../Profile/components/SocialLink";

const UserProfile = () => {
    const {username} = useParams()
    const [userProfile, setUserProfile] = useState(null);
    const [err, setErr] = useState(false)
    const getUserProfile = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": username
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/user/getUserProfile", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                const parsed = JSON.parse(result)
                if (parsed.username) {
                    setUserProfile(parsed)
                }
                setErr(parsed)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <>
            <link rel='stylesheet prefetch'
                  href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>

            <link rel='stylesheet prefetch'
                  href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600'/>

            <main className={"userProfileMain"}>
                <div className="row_profile">
                    <div className="left col-lg-4">
                        <div className="photo-left">
                            <img className={"photo"}
                                 src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                            <div className="active"></div>
                        </div>
                        <h4 className="name">@{userProfile ? userProfile.username ?? null : null}</h4>
                        <p className="info">{userProfile ? userProfile.job ?? null : null}</p>
                        <p className="info">{userProfile ? userProfile.email ?? null : null}</p>
                        <div className="stats row_profile">
                            <div className="stat col-xs-4" style={{paddingRight: "50px"}}>
                                <p className="number-stat">3,619</p>
                                <p className="desc-stat">Followers</p>
                            </div>
                            <div className="stat col-xs-4">
                                <p className="number-stat">42</p>
                                <p className="desc-stat">Following</p>
                            </div>
                            <div className="stat col-xs-4" style={{paddingLeft: "50px"}}>
                                <p className="number-stat">38</p>
                                <p className="desc-stat">Uploads</p>
                            </div>
                        </div>
                        <p className="desc">{userProfile ? userProfile.description ?? "no description yet": null}</p>
                        <div className="social">
                            <SocialLink userProfile={userProfile} icon={<i className="fa fa-brands fa-github"  aria-hidden="true"></i>} linkType={"github_link"}/>
                            <SocialLink userProfile={userProfile} icon={<i className="fa fa-brands fa-instagram"></i> } linkType={"instagram_link"}/>
                        </div>
                    </div>
                    <div className="right col-lg-8">
                    </div>
                </div>
            </main>
        </>
    )
}
export default UserProfile
