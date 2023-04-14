const fetchData = async (url, body = {} ,method = "POST", token) => {
    let myHeaders = new Headers();
    token ? myHeaders.append("Authorization", `Bearer ${token}`) : null

    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method,
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow'
    };

    const response = await fetch(url, requestOptions)
    try {
        const parsedResult =  response.status >= 200 && response.status < 300 ? await response.json() : response
        return parsedResult
    } catch (e) {
        console.error(e)
        throw e;
    }
}
export default fetchData;
