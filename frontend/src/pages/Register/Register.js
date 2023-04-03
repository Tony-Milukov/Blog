import "./Register.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {emailExp, nameExp, passwordExp} from "./regExps";
import messages from "./messages"
import {userStore} from "../../store/user";

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
    const register = (e) => {
        e.preventDefault()
        setErrors({
            username: username.match(nameExp) ? false : true,
            email: email.match(emailExp) ? false : true,
            password: password.match(passwordExp) ? false : true,
            passwordsMatch: password ? (password.match(repeatPassword) ? false : true) : true
        })
        if (email && password && username) {
            if (username.match(nameExp) && email.match(emailExp) && password.match(passwordExp) && password.match(repeatPassword)) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                let body = JSON.stringify({
                    "email": email,
                    "password": password,
                    "name": username
                });
                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: body,
                };

                fetch("http://localhost:5000/user/register", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        let parsed = JSON.parse(result)
                        if (parsed.status && parsed.status == 201) {
                            navigate("/login")
                        }
                        console.log(result)
                        setErrors({
                            email: parsed.emailErr && parsed.emailErr.status == 303 ? parsed : null,
                            password: null,
                            username: parsed.usernameErr && parsed.usernameErr.status == 303 ? parsed : null,
                        })

                    })
                    .catch(error => console.log('error', error));
            }
        }
    }


    if (!token) {
        return <>
            <div className="login-form">
                <form>
                    <h1>Register</h1>
                    <div className="content">
                        <div className="input-field">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
                                   autoComplete="email"/>
                            <p>{errors.email ? (errors.email.emailErr ? (errors.email.emailErr.message ?? messages.email) : messages.email) : null}</p>

                        </div>
                        <div className="input-field">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"
                                   autoComplete="new-password"/>
                            <p>{errors.password ? messages.password : null}</p>
                        </div>
                        <div className="input-field">
                            <input onChange={(e) => setRepeatPassword(e.target.value)} type="password"
                                   placeholder="repeat your password"
                                   autoComplete="new-password"/>
                            <p>{errors.passwordsMatch ? messages.passwordsMatch : null}</p>
                        </div>
                        <div className="input-field">
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="name"
                                   autoComplete="given-name"/>
                            <p>{errors.username ? (errors.username.usernameErr ? (errors.username.usernameErr.message ?? messages.username) : messages.username) : null}</p>
                        </div>
                    </div>
                    <div className="action">
                        <button onClick={() => navigate("/login")}> Login</button>
                        <button onClick={(e) => register(e)}> Register</button>
                    </div>
                </form>
            </div>
        </>
    }
}
export default Register
