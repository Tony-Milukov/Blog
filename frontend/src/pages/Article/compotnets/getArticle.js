const getArticle = async (id) =>  {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let body = JSON.stringify({
        "id": id
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };
    const article = await fetch("http://localhost:5000/articles/getArticleById", requestOptions)
    try {
        const parsedArticle =  await article.json()
        return parsedArticle
    } catch (e) {
        console.error(e)
    }
}
export default getArticle;
