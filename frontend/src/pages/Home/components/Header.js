import {useEffect, useState} from "react";
import getHomePageArticles from "./getHomePageArticles";
import HeaderArticle from "./HeaderArticle";

const Header = () => {
    const [headerArticles, setHeaderArticles] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const headerArticles = await getHomePageArticles()
            setHeaderArticles(headerArticles);
            setLoaded(true)
        }
        fetch()
    }, [])

    return <>{loaded ?
           <div className="pageheader-content row">
               <div className="col-full">
                   <div className="featured">
                       {headerArticles.map((article, index) => <HeaderArticle article={article} index={index}/>)}
                   </div>
               </div>
           </div>
 : null}</>
}
export default Header



