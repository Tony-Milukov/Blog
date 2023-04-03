import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header/Header"
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register"
import Footer from "./components/Footer/Footer";
import ProfilePage from "./pages/Profile/Profile";
const Router = () => {
    return (
        <div className={"Routers"}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={"/login"} element={<LoginPage/>}></Route>
                    <Route path={"/register"}  element={<RegisterPage/>} ></Route>
                    <Route path={"/profile"}  element={<ProfilePage/>} ></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>

        </div>
    )
}
export default Router
