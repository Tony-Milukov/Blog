import {Link} from "react-router-dom";


const Comment = (props) => {
  return ( <li className="depth-1 comment">
    <div className="comment__avatar">
      <img width="50" height="50" className="avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png"
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
  </li>)
}
export default Comment
