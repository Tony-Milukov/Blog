const sendRequest = async (articleValue, title, cathegory, token, articleType = "text") => {
    if (token) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        let body = JSON.stringify({
            "articleType": articleType,
            "cathegory": cathegory,
            "title": title,
            "articleValue": articleValue,
        });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: body,
        };

        return await fetch("http://localhost:5000/articles/newArticle", requestOptions)
            .then(response => response.text())
            .then(result => {
                return JSON.parse(result)
            })
    .
        catch(error => console.log('error', error));
    } else {
        return false
    }

}
export default sendRequest
