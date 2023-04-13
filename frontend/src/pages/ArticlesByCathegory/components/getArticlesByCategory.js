const getArticlesByCategory  =  async (category) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
        "cathegory": category
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

   try {
       const articles = await fetch("http://localhost:5000/articles/getArticleByCathegory", requestOptions)
       const articlesParsed = JSON.parse(await articles.text())
       return articlesParsed;
   } catch (e) {
       console.error(e)
   }

}
export default getArticlesByCategory
