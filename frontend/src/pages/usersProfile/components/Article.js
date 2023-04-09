import {Link} from "react-router-dom";

const Article = ({article}) => {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const first200Symbols = `${article.text.replace(/(<([^>]+)>)/gi, '').slice(0, 250)}...`
    const date_created = new Date(article.date_created)

    const date = `${monthNames[date_created.getDate()]} ${date_created.getMonth()} @ ${date_created.getUTCHours()}:${date_created.getUTCMinutes()}`
    console.log(article)
    return <div className={"UserArticle"}>
        <Link to={`/articles/${article.id}`}>
            <div className="userArticleTitle">{article.title}</div>
            <div dangerouslySetInnerHTML={{__html: first200Symbols}} className={"userArticleValue"}></div>
        </Link>
        <div className="articleData">{date}</div>
    </div>

}
export default Article
