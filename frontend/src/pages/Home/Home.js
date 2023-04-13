import "./home.css";
import {useEffect, useState} from "react";
import getArticlesByPage from "../Articles/components/getArticlesByPage";
import getArticlesByCategory from "../ArticlesByCathegory/components/getArticlesByCategory";

const HomePage = () => {
    const [articles, setArticles] = useState()
    const categories = ["programming", "lifestyle", "family", "management", "Travel", "Work"];
    const [loaded, setLoaded] = useState(false)
    const [headerArticles, setHeaderArticles] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const articles = await getArticlesByPage(1)
            setArticles(articles);
            console.log(await getHeaderArticles())
            setLoaded(true)
        }
        fetch()
    }, [])


    const getHeaderArticles = () => {
        const getRandomArticles = (articles) => {
            const article = articles[Math.floor(Math.random() * articles.length)]
            !headerArticles.includes(article)
                ? setHeaderArticles([...headerArticles, article])
                : getRandomArticles(articles)
        }

        const getRandomCatgs = () => {
            (async () => {
                const category = categories[Math.floor(Math.random() * categories.length)]
                const articles = await getArticlesByCategory(category)
                if (articles.status && articles.status === 404) {
                    getRandomCatgs()
                } else {
                    console.log(true)
                    getRandomArticles(articles)
                }
            })()
        }

        for (let i = 0; i <= 2; i++) {
            getRandomCatgs();
        }
    }


    return <>
        {loaded ? <div className="pageheader-content row">
            <div className="col-full">

                <div className="featured">

                    <div className="featured__column featured__column--big">
                        <div className="entry">

                            <div className="entry__content">
                                    <span className="entry__category"><a
                                        href="#0">{}</a></span>

                                <h1><a href="#0" title="">What Your Music Preference Says About You and Your
                                    Personality.</a></h1>

                                <div className="entry__info">
                                    <a href="#0" className="entry__profile-pic">
                                        <img className="avatar" src="images/avatars/user-03.jpg" alt=""/>
                                    </a>

                                    <ul className="entry__meta">
                                        <li><a href="#0">John Doe</a></li>
                                        <li>December 29, 2017</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="featured__column featured__column--small">

                        <div className="entry">

                            <div className="entry__content">
                                <span className="entry__category"><a href="#0">{}</a></span>

                                <h1><a href="#0" title="">The Pomodoro Technique Really Works.</a></h1>

                                <div className="entry__info">
                                    <a href="#0" className="entry__profile-pic">
                                        <img className="avatar" src="images/avatars/user-03.jpg" alt=""/>
                                    </a>

                                    <ul className="entry__meta">
                                        <li><a href="#0">John Doe</a></li>
                                        <li>December 27, 2017</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="entry">
                            <div className="entry__content">
                                <span className="entry__category"><a href="#0">{}</a></span>

                                <h1><a href="#0" title="">Throwback To The Good Old Days.</a></h1>

                                <div className="entry__info">
                                    <a href="#0" className="entry__profile-pic">
                                        <img className="avatar" src="images/avatars/user-03.jpg" alt=""/>
                                    </a>

                                    <ul className="entry__meta">
                                        <li><a href="#0">John Doe</a></li>
                                        <li>December 21, 2017</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null}
    </>
}
export default HomePage
