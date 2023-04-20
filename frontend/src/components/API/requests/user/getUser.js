import fetchData from "../../fetchData";

const getUser = async (token) => {
    return  await fetchData("user/getUser",{},"POST",token)
}
export default getUser
