const getArticlesByUsername = async (username) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": username
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const articles = await fetch("http://localhost:5000/articles/getArticleByUsername", requestOptions)
        const parsedArticles = await articles.json();
        return parsedArticles
    } catch (e) {
        console.error(e)
    }

}
export default getArticlesByUsername
