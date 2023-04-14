import fetchData from "../../fetchData";

const getUserByUsername = async (username) => {
    return await fetchData("http://localhost:5000/user/getUserProfile", {
        "username": username
    })
}
export default getUserByUsername
