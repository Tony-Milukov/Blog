const getHomePageArticles = async () => {

    let requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

   try {
       const articles = await fetch("http://localhost:5000/articles/getHomePageArticles",requestOptions);
       const parsedArticles = await articles.json()
       console.log(parsedArticles);
       return parsedArticles
   } catch (e) {
       console.error(e)
       throw new Error(e)
   }


}
export default getHomePageArticles;
