import fetchData from "../../fetchData";

const getHomePageArticles = async () => {
    return   await fetchData("articles/getHomePageArticles")
}
export default getHomePageArticles;
