import fetchData from "../../fetchData";

const addNewArticle = async (articleValue, title, cathegory, token, articleType = "text") => {
        return await fetchData("http://localhost:5000/articles/newArticle", {
                "articleType": articleType,
                "cathegory": cathegory,
                "title": title,
                "articleValue": articleValue,
        },"PUT", token);
}
export default addNewArticle
