import fetchData from "../../fetchData";

const login = async (email,password) => {
    return await fetchData("http://localhost:5000/user/login", {
        email,
        password
    })
}
export default login
