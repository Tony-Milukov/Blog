const searchRequest = async (searchValue) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
        "searchValue": searchValue
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

   const searchMatches = await fetch("http://localhost:5000/search", requestOptions);
   const parsedSearchMatches = JSON.parse(await searchMatches.text())
   return parsedSearchMatches

}
export default searchRequest
