const getUser = async (token) => {
            if(token) {
                let myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);
                myHeaders.append("Content-Type", "application/json");
                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                };

                try {
                    const user = await fetch("http://localhost:5000/user/getUser", requestOptions)
                    const parsedUser = await user.json()
                    return parsedUser ?? false
                } catch (e) {
                    console.error(e)
                }

            }
}
export default getUser
