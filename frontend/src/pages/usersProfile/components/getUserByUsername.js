const getUserProfile = async (username) => {
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
       const userProfile =  await fetch("http://localhost:5000/user/getUserProfile", requestOptions)
       const parsedUserProfile = await userProfile.json()
       if(parsedUserProfile.username) {
           return parsedUserProfile
       }

   } catch (e) {
       console.error(e)
   }
}
export default getUserProfile
