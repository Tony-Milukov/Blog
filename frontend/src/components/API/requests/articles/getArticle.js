import fetchData from "../../fetchData";

const getArticle = async (id) =>  {
   return  await fetchData("http://localhost:5000/articles/getArticleById", {
        "id": id
    })
}
export default getArticle;
