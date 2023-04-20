import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import getUserByUsername from "../../../components/API/requests/user/getUserByUsername";


const Comment = (props) => {
    const [avatarLink, setAvatarLink] = useState()
    const [isLoaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const user = await getUserByUsername(props.username)
            setAvatarLink(user.avatar)
            console.log(avatarLink)
            setLoaded(true)
        }
        fetch()
    },[])
    return (isLoaded ? <li className="depth-1 comment">
        <div className="comment__avatar">
            <img width="50" height="50" className="avatar" src={`http://localhost:5000/${avatarLink}`}
                 alt=""/>
        </div>
        <div className="comment__content">
            <div className="comment__info">
                <cite><Link to={`/users/${props.username}`}>@{props.username}</Link></cite>
                <div className="comment__meta">
                    <time className="comment__time">{props.date}</time>
                </div>
            </div>

            <div className="comment__text">
                <p>{props.commentValue}</p>
            </div>

        </div>
    </li> : null)
}
export default Comment
