import fetchData from "../../fetchData";

const getHomePageArticles = async () => {
    return   await fetchData("http://localhost:5000/articles/getHomePageArticles")
}
export default getHomePageArticles;
