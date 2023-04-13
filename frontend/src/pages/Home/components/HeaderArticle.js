import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const HeaderArticle = ({article, index}) => {
    const [date, setDate] = useState()
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    const images = {
        lifestyle: "https://github.com/Tony-Milukov/Blog/blob/main/imgs/unnamed.jpg?raw=true",
        programming: "https://github.com/Tony-Milukov/Blog/blob/main/imgs/promgramming.jpg?raw=true",
        family: "https://github.com/Tony-Milukov/Blog/blob/main/imgs/family.jpg?raw=true",
        management: "https://github.com/Tony-Milukov/Blog/blob/main/imgs/managment.png?raw=true",
        Travel: "https://github.com/Tony-Milukov/Blog/blob/main/imgs/travel.jpg?raw=true",
        Work: "https://github.com/Tony-Milukov/Blog/blob/main/imgs/work.jpeg?raw=true"
    }
    useEffect(() => {
        const date_created = new Date(article["date_created"])
        setDate(`${monthNames[date_created.getMonth()]} ${date_created.getDate()} @ ${date_created.getUTCHours()}:${date_created.getUTCMinutes()}`)
    }, [])
    return <>
            <div className={`featured__column featured__column--${index === 0 ? "big" : "small"}`}>
                <div className="entry" style={{backgroundImage: `url('${images[article.category]}')`}}>
                    <div className="entry__content">
                        <span className="entry__category"><Link
                            to={`/articles/category/${article.category}`}>{article.category}</Link></span>


                        <h1><Link to={`/articles/${article.id}`}>{article.title}</Link></h1>

                        <div className="entry__info">

                            <ul className="entry__meta">
                                <li><Link to={`users/${article.owner}`}>@{article.owner}</Link></li>
                                <li>{date}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

    </>
}
export default HeaderArticle
