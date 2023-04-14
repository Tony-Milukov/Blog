import {useEffect} from "react";
import getUser from "../components/API/requests/user/getUser";
import {useNavigate} from "react-router-dom";
import {userStore} from "../store/user";

const useAuth = (token) => {
    const navigate = useNavigate()
    const logout = userStore((state) => state.logout)

    useEffect(() => {
        //if token exists in Localstorage
        !token ? navigate("/login") : null;
        //if Token isn't active we will remove token from Zustand and redirect user to login page
        const checkAuth = async () => {
            const user = await getUser(token);
            if (!user) {
                logout()
                navigate('/login');
            }
        }
        checkAuth()

    }, [token]);
};

export default useAuth
