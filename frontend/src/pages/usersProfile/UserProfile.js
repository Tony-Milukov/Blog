import "./userProfile.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SocialLink from "../Profile/components/SocialLink";
import getUserProfile from "../../components/API/requests/user/getUserByUsername";
import Popup from "../../components/Popup";
import getArticlesByUsername from "../../components/API/requests/articles/getArticlesByUsername";
import Article from "../../components/Article";
import {useLocation} from 'react-router-dom';


const UserProfile = () => {
    const {username} = useParams()
    const [userProfile, setUserProfile] = useState();
    const [userArticles, setUserArticles] = useState();
    const [isLoaded, setIsLoaded] = useState(false)

    //I know, this is not good, but without this  search will not work
    const location = useLocation()

    useEffect(() => {
        const fetch = async () => {
            const userProfile = await getUserProfile(username);
            const userArticles = await getArticlesByUsername(username);
            setUserProfile(userProfile)
            setUserArticles(userArticles)
            setIsLoaded(true)

        }
        fetch()
    }, [location])
    return (<div style={{minHeight: "100vh"}}>

        {
            userProfile && userProfile.username ? <>

                <link rel='stylesheet prefetch'
                      href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>
                <link rel='stylesheet prefetch'
                      href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600'/>

                <main className={"userProfileMain"}>
                    <div className="row_profile">
                        <div className="left col-lg-4">
                            <div className="photo-left">
                                <img className={"photo"}
                                     src={`http://localhost:5000/${userProfile.avatar}`}/>
                                <div className="active"></div>
                            </div>
                            <h4 className="name">@{userProfile ? userProfile.username ?? null : null}</h4>
                            <p className="info">{userProfile ? userProfile.job ?? null : null}</p>
                            <p className="info email_info">{userProfile ? userProfile.email ?? null : null}</p>
                            <div className="stats row_profile">
                                {/*<div className="stat col-xs-4" style={{paddingRight: "50px"}}>*/}
                                {/*    <p className="number-stat">3,619</p>*/}
                                {/*    <p className="desc-stat">Followers</p>*/}
                                {/*</div>*/}
                                {/*<div className="stat col-xs-4">*/}
                                {/*    <p className="number-stat">42</p>*/}
                                {/*    <p className="desc-stat">Following</p>*/}
                                {/*</div>*/}

                                    <div className="stat col-xs-4" >
                                    <p className="number-stat">{userArticles.length ?? 0}</p>
                                    <p className="desc-stat">Uploads</p>
                                    </div>
                                    </div>
                                    <p className="desc">{userProfile ? userProfile.description ?? "no description yet" : null}</p>
                                    <div className="social">
                                    <SocialLink userProfile={userProfile}
                                    icon={<i className="fa fa-brands fa-github" aria-hidden="true"></i>}
                                    linkType={"github_link"}/>
                                    <SocialLink userProfile={userProfile}
                                    icon={<i className="fa fa-brands fa-instagram"></i>}
                                    linkType={"instagram_link"}/>
                                    </div>
                                    </div>

                                    </div>
                                    <div className="userArticles">
                                    <h1>Articles</h1>
                                    <hr/>
                                {!userArticles.status ? userArticles.map(article => <><Article article={article}/>
                                    <hr/>
                                    </>) : null}
                                {userArticles.status ? <h3>No articles yet</h3>:null}
                                    </div>
                                    </main>

                                    </> : isLoaded ? <Popup message={"sorry, user was not defined"}/> : null}

                            </div>
                            )
                            }
                            export default UserProfile
