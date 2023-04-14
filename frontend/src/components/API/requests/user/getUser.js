import fetchData from "../../fetchData";

const getUser = async (token) => {
    return  await fetchData("http://localhost:5000/user/getUser",{},"POST",token)
}
export default getUser
