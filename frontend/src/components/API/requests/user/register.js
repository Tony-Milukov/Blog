import fetchData from "../../fetchData";

const register = async (email,password,username) => {
    return await fetchData("user/register", {
            "email": email,
            "password": password,
            "name": username
        },"PUT")
}
export default register
