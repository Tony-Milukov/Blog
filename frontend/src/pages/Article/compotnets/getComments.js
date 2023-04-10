const getComments = async (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "articleId": id
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const comments = await fetch("http://localhost:5000/articles/getCommentsByArticleId", requestOptions)
        const parsedComments = await comments.json()
        return parsedComments
    } catch (e) {
        console.error(e)
    }
}
export default getComments
