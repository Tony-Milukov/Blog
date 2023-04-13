import "../ArticlesByCathegory/articles.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getArticlesByCategory from "./components/getArticlesByCategory";
import Article from "../../components/Article"
import Popup from "../../components/Popup";
import {useLocation} from "react-router-dom";
const ArticlesByCat = () => {
    const location = useLocation()
    const {category} = useParams()
    const [articles, setArticles] = useState()
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const articles = await getArticlesByCategory(category);
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
    </>
}
export default ArticlesByCat;
