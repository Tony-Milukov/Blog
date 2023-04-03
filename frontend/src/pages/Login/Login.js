import "./login.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userStore} from '../../store/user';

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

    const login = (e) => {
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

                    fetch("http://localhost:5000/user/login", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            let parsed = JSON.parse(result)
                            if (parsed.token) {
                                setError("")
                                loginState(parsed.token)
                                navigate("/")
                            } else {
                                setError(parsed)
                            }

                        })
                        .catch(error => console.log('error', error));
                }
        }
    }
    if(!token) {
        return <>
            <div className="login-form">
                <form>
                    <h1>Login</h1>
                    <div className="content">
                        <div className="input-field">
                            <input onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Email"  autoComplete="email"/>
                        </div>
                        <div className="input-field">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"
                                   autoComplete="new-password"/>
                        </div>
                        {error.message ?? null}
                    </div>
                    <div className="action">
                        <button onClick={() => navigate("/register")}> Register</button>
                        <button onClick={(e) => login(e)}>Sign in</button>
                    </div>
                </form>
            </div>
        </>
    }
};

export default LoginPage;
