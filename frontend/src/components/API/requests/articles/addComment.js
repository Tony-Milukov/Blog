import fetchData from "../../fetchData";

const addComment = async (articleId,commentValue,owner,token) => {
    return await fetchData("http://localhost:5000/articles/addComment", {
        articleId,
        commentValue,
        owner
    }, "PUT", token)
}
export default addComment
