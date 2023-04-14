import fetchData from "../../fetchData";

const getComments = async (id) => {
    return await fetchData("http://localhost:5000/articles/getCommentsByArticleId", {
        "articleId": id
    })
}
export default getComments
