import {Link, useParams} from "react-router-dom";
import "./articles.css";
import {useEffect, useState} from "react";
import getArticlesByPage from "../../components/API/requests/articles/getArticlesByPage";
import Popup from "../../components/Popup";
import Article from "../../components/Article";
import {useLocation} from "react-router-dom";

const Articles = () => {
    const {page} = useParams()
    const [articles, setArticles] = useState()
    const [loaded, setLoaded] = useState(false)
    const location = useLocation()
    useEffect(() => {
        const fetch = async () => {
            window.scrollTo(0, 0);
            const articles = await getArticlesByPage(page)
            setArticles(articles)
            setLoaded(true)
        }
        fetch()
    }, [location])
    return (
        <>
            <div className="articlesPageContainer">
                <div className={"containerArticles"}>
                    {
                        loaded && articles && !articles.status ?
                            articles.map(article =>
                                <><Article article={article}/>
                                    <hr/>
                                </>) : loaded && articles && articles.status === 404 ?
                                <Popup message={articles.message}/> : null
                    }
                </div>
            </div>
            <div className="paginationContainer">
                <Link to={`/articles/page/${parseInt(page) !== 1 ? parseInt(page)-1: page}`}>&laquo; </Link>

                <Link to={`/articles/page/${parseInt(page) + 1}`}>&raquo;</Link>
            </div>
        </>
    )
}
export default Articles
