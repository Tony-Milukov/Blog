import fetchData from "../../fetchData";

const getArticlesByCategory  =  async (category) => {
    return  await fetchData("http://localhost:5000/articles/getArticleByCategory", {
        "category": category
    })
}
export default getArticlesByCategory
