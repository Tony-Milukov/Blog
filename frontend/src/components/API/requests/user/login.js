import fetchData from "../../fetchData";

const login = async (email,password) => {
    return await fetchData("user/login", {
        email,
        password
    })
}
export default login
