import fetchData from "../../fetchData";

const getArticlesByPage = async (page) => {
    return  await fetchData("http://localhost:5000/articles/getAllArticlesByPage", {
        "page": page
    })
}
export default getArticlesByPage;
