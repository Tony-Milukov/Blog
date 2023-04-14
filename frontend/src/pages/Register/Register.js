import "./Register.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {emailExp, nameExp, passwordExp} from "./components/regExps";
import messages from "./components/messages"
import {userStore} from "../../store/user";
import AuthInput from "../../components/AuthInput";
import register from "../../components/API/requests/user/register";

const Register = () => {
    //if authenticated => homePage
    useEffect(() => {
        token ? navigate("/") : null
    }, [])
    const navigate = useNavigate()
    const token = userStore(state => state.userInfo.token)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        username: false,
        passwordsMatch: false
    })
    const [username, setUsername] = useState("")
    const register_ = async (e) => {
        e.preventDefault()
        setErrors({
            username: username.match(nameExp) ? false : true,
            email: !email.match(emailExp),
            password: !password.match(passwordExp),
            passwordsMatch: password ? (!password.match(repeatPassword)) : true
        })
        if (email && password && username) {
            if (username.match(nameExp) && email.match(emailExp) && password.match(passwordExp) && password.match(repeatPassword)) {
                const res = await register(email, password, username);
                const parsed = res.status === 303 ? await res.json() : res
                    if (res.status && res.status == 201) {
                        navigate("/login")
                    }
                setErrors({
                    email: parsed.emailErr && parsed.emailErr.status == 303 ? parsed : null,
                    password: null,
                    username: parsed.usernameErr && parsed.usernameErr.status == 303 ? parsed : null,
                })
            }



        }
    }


if (!token) {
    return <>
        <div className="login-form">
            <div>
                <h1>Register</h1>
                <div className="content">
                    <AuthInput action={setEmail} placeholder={"email"} type={"email"}
                               error={errors.email ? (errors.email.emailErr ? (errors.email.emailErr.message ?? messages.email) : messages.email) : null}></AuthInput>
                    <AuthInput action={setPassword} placeholder={"password"} type={"password"}
                               error={errors.password ? messages.password : null}></AuthInput>
                    <AuthInput action={setRepeatPassword} placeholder={"repeat your password"} type={"password"}
                               error={errors.passwordsMatch ? messages.passwordsMatch : null}></AuthInput>
                    <AuthInput action={setUsername} placeholder={"username"} type={"text"}
                               error={errors.username ? (errors.username.usernameErr ? (errors.username.usernameErr.message ?? messages.username) : messages.username) : null}/>
                </div>
                <div className="action">
                    <button onClick={() => navigate("/login")}> Login</button>
                    <button onClick={(e) => register_(e)}> Register</button>
                </div>
            </div>
        </div>
    </>
}
}
export default Register
