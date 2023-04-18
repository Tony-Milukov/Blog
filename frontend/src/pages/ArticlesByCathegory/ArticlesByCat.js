import "../ArticlesByCathegory/articles.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getArticlesByCategory from "../../components/API/requests/articles/getArticlesByCategory";
import Article from "../../components/Article"
import Popup from "../../components/Popup";
import {useLocation} from "react-router-dom";
import PaginationController from "../../components/Pagination";
const ArticlesByCat = () => {
    const location = useLocation()
    const {category,page} = useParams()
    const [articles, setArticles] = useState()
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const articles = await getArticlesByCategory(category,page);
            console.log(articles)
            setArticles(articles)
            setLoaded(true)
        }
        fetch()
    },[location])
    return <>
        <div className="articlesByCategoryContainer">
            <h3 className={"categoryHeader"}>Category : {category}</h3>
            <div className={"containerArticles"}>
                {
                    loaded && articles && !articles.status ?
                        articles.map(article =>
                            <><Article article={article}/>
                                <hr/>
                            </>) : loaded && articles && articles.status === 404 ? <Popup message={articles.message} />: null
                }
            </div>
        </div>
        <PaginationController page={page}/>
    </>
}
export default ArticlesByCat;
