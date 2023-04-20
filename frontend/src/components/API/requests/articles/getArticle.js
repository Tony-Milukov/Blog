import fetchData from "../../fetchData";

const getArticle = async (id) =>  {
   return  await fetchData("articles/getArticleById", {
        "id": id
    })
}
export default getArticle;
