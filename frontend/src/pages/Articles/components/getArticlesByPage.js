const getArticlesByPage = async (page) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    let body = JSON.stringify({
        "page": page
    });


    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    try {
        const articles = await fetch("http://localhost:5000/articles/getAllArticlesByPage", requestOptions);
        const  parsedArticles = JSON.parse(await articles.text())
        return parsedArticles;
    } catch (e) {
        console.error(e);
        throw e;


    }


}
export default getArticlesByPage;
