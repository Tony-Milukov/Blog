import "./login.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userStore} from '../../store/user';
import AuthInput from "../../components/AuthInput";

const LoginPage = () => {
    //if authenticated => homePage
    const token = userStore(state => state.userInfo.token)
    const navigate = useNavigate()

    useEffect(() => {
        token ? navigate("/") : null
    },[])

    const loginState = userStore((state) => state.login)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()
        if (email && password) {
                let myHeaders = new Headers();
                token ? myHeaders.append("Authorization", `Bearer ${token}`) : null
                if (!token) {
                    myHeaders.append("Content-Type", "application/json");
                    let body = JSON.stringify({
                        "email": email,
                        "password": password,
                    });
                    let requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: body,
                    };

                   try {
                       const token =  await fetch("http://localhost:5000/user/login", requestOptions)
                       const parsedToken = await token.json()
                       if (parsedToken.token) {
                           setError("")
                           loginState(parsedToken.token)
                           navigate("/")
                       } else {
                           setError(parsedToken)
                       }
                   } catch (e) {
                       console.error(e)
                   }
                }
        }
    }
    if(!token) {
        return <>
            <div className="login-form">
                <div>
                    <h1>Login</h1>
                    <div className="content">
                            <AuthInput placeholder={"email"} type={"email"}  action={setEmail}/>
                        <AuthInput placeholder={"password"} type={"password"} action={setPassword}/>
                        {error.message ?? null}
                    </div>
                    <div className="action">
                        <button onClick={() => navigate("/register")}> Register</button>
                        <button onClick={(e) => login(e)}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    }
};

export default LoginPage;
