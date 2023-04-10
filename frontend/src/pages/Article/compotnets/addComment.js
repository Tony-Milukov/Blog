const addComment = async (articleId,commentValue,owner,token) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
        articleId,
        commentValue,
        owner
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    try {
        const res =  await fetch("http://localhost:5000/articles/addComment", requestOptions)
        console.log( await res.json())
        return res ?? false
    } catch (e) {
        console.error(e)
    }
}
export default addComment
