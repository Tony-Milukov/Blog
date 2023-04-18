import fetchData from "../../fetchData";

const getArticlesByCategory  =  async (category,page) => {
    return  await fetchData("http://localhost:5000/articles/getArticleByCategory", {
        category,
        page: parseFloat(page),
    })
}
export default getArticlesByCategory
