import fetchData from "../../fetchData";

const getArticlesByCategory  =  async (category,page) => {
    return  await fetchData("articles/getArticleByCategory", {
        category,
        page: parseFloat(page),
    })
}
export default getArticlesByCategory
