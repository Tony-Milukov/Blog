import fetchData from "../../fetchData";

const addComment = async (articleId,commentValue,owner,token) => {
    return await fetchData("articles/addComment", {
        articleId,
        commentValue,
        owner
    }, "PUT", token)
}
export default addComment
