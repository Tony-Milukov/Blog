import "./home.css";
import {useEffect, useState} from "react";
import Header from "./components/Header";
import Popup from "../../components/Popup";
import Article from "../../components/Article";
import {Link} from "react-router-dom";
import getHomePageArticles from "../../components/API/requests/articles/getHomePageArticles";


const HomePage = () => {
    const [articles, setArticles] = useState()
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const {articles} = await getHomePageArticles()
            console.log(articles)
            setArticles(articles);
            setLoaded(true);
        }
        fetch()
    }, [])

    return <>
        {loaded ? <>
            <Header articles={articles}/>
            <div className="articlesPageContainer">
                <div className={"containerArticles"}>
                    {   articles && !articles.status ?
                        articles.map(article =>
                            <><Article article={article}/>
                                <hr/>
                            </>) : loaded && articles && articles.status === 404 ?
                            <Popup message={articles.message}/> : null
                    }
                </div>
                <Link className={"moreArticlesBTN"} to={"articles/page/1"}>More</Link>

            </div>
        </>: null}
    </>
}
export default HomePage
