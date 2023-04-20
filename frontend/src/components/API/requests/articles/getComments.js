import fetchData from "../../fetchData";

const getComments = async (id) => {
    return await fetchData("articles/getCommentsByArticleId", {
        "articleId": id
    })
}
export default getComments
