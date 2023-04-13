import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header/Header"
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register"
import Footer from "./components/Footer/Footer";
import ProfilePage from "./pages/Profile/Profile";
import UserProfile from "./pages/usersProfile/UserProfile";
import "./App.css"
import NewTextArticle from "./pages/newArticle/TextArticle/NewTextArticle";
import Article from "./pages/Article/Article";
import ArticlesByCat from "./pages/ArticlesByCathegory/ArticlesByCat";
import Articles from "./pages/Articles/Articles";
import Home from "./pages/Home/Home";
const Router = () => {
    return (
        <div className={"Routers"}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/login"} element={<LoginPage/>}></Route>
                    <Route path={"/register"}  element={<RegisterPage/>} ></Route>
                    <Route path={"/profile"}  element={<ProfilePage/>} ></Route>
                    <Route path={"/users/:username"}  element={<UserProfile/>} ></Route>
                    <Route path={"/newTextArticle"}  element={<NewTextArticle/>} ></Route>
                    <Route path={"/articles/"} >
                        <Route path={":id"} element={<Article/>}></Route>
                        <Route path={"category/:category"} element={<ArticlesByCat/>}></Route>
                        <Route path={"page/:page"} element={<Articles/>}></Route>
                    </Route>

                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    )
}
export default Router
