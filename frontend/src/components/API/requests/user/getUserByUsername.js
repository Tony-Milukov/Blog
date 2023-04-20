import fetchData from "../../fetchData";

const getUserByUsername = async (username) => {
    return await fetchData("user/getUserProfile", {
        "username": username
    })
}
export default getUserByUsername
