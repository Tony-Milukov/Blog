import fetchData from "../../fetchData";

const addNewArticle = async (articleValue, title, cathegory, token, articleType = "text") => {
        return await fetchData("articles/newArticle", {
                "articleType": articleType,
                "cathegory": cathegory,
                "title": title,
                "articleValue": articleValue,
        },"PUT", token);
}
export default addNewArticle
