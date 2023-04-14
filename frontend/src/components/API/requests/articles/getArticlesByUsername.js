import fetchData from "../../fetchData";

const getArticlesByUsername = async (username) => {
    return  await fetchData("http://localhost:5000/articles/getArticleByUsername", {
        "username": username
    })
}
export default getArticlesByUsername
