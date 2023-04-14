import "./login.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userStore} from '../../store/user';
import AuthInput from "../../components/AuthInput";
import login from "../../components/API/requests/user/login"

const LoginPage = () => {
    //if authenticated => homePage
    const token = userStore(state => state.userInfo.token)
    const navigate = useNavigate()

    useEffect(() => {
        token ? navigate("/") : null
    }, [])

    const loginState = userStore((state) => state.login)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")

    const login_ = async (e) => {
        e.preventDefault()
        if (email && password) {

                const newToken = await login(email, password)
                if (newToken.token) {
                    setError("")
                    loginState(newToken.token)
                    navigate("/")
                } else {
                    setError(await newToken.json())
                }
        }
    }
    if (!token) {
        return <>
            <div className="login-form">
                <div>
                    <h1>Login</h1>
                    <div className="content">
                        <AuthInput placeholder={"email"} type={"email"} action={setEmail}/>
                        <AuthInput placeholder={"password"} type={"password"} action={setPassword}/>
                        {error.message ?? null}
                    </div>
                    <div className="action">
                        <button onClick={() => navigate("/register")}> Register</button>
                        <button onClick={(e) => login_(e)}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    }
};

export default LoginPage;
