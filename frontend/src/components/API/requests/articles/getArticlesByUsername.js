import fetchData from "../../fetchData";

const getArticlesByUsername = async (username) => {
    return  await fetchData("articles/getArticleByUsername", {
        "username": username
    })
}
export default getArticlesByUsername
