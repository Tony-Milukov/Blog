import fetchData from "../../fetchData";

const getArticlesByPage = async (page) => {
    return  await fetchData("articles/getAllArticlesByPage", {
        "page": page
    })
}
export default getArticlesByPage;
