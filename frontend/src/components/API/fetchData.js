const fetchData = async (url, body = {} ,method = "POST", token) => {
    const host = "http://localhost:5000/";
    let myHeaders = new Headers();
    !(body instanceof FormData) ? myHeaders.append("Content-Type", "application/json") : null;

    token ? myHeaders.append("Authorization", `Bearer ${token}`) : null
    console.log()
    let requestOptions = {
        method,
        headers: myHeaders,
        body: body instanceof FormData ? body : JSON.stringify(body),
        redirect: 'follow'
    };

    const response = await fetch(host + url, requestOptions)
    try {
        const parsedResult =  response.status >= 200 && response.status < 300 ? await response.json() : response
        return parsedResult
    } catch (e) {
        console.error(e)
        throw e;
    }
}
export default fetchData;
