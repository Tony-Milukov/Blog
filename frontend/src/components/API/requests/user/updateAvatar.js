import fetchData from "../../fetchData";

const updateAvatar = async (avatar,token) => {
    let avatar_ = new FormData();
    avatar_.append('img', avatar,"img");
    return await fetchData("user/avatar", avatar_,"PUT",token)
}
export default updateAvatar
