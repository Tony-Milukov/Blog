import ReactQuill from 'react-quill';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userStore} from "../../../store/user";
import "./newTextArticle.css"
import config from "../components/quillConfig";
import sendRequest from "../components/sendRequest";
import 'react-quill/dist/quill.snow.css';
import messages from "../messages"

const NewTextArticle = () => {
    const navigate = useNavigate()
    const token = userStore(state => state.userInfo.token)
    const [articleValue, setArticleValue] = useState(null);
    const [title, setTitle] = useState(null)
    const [cathegory, setCathegory] = useState(null)
    const [cathegories] = useState(["programming", "lifestyle", "family", "management", "Travel", "Work"])
    const [err, setErr] = useState({
        titleErr: false,
        articleValue: false,
        cathegory: false,
    })
    useEffect(() => {
        !token ? navigate("/login") : null
    }, [])
    const publishArticle = async () => {
        setErr({
            titleErr: title ? false : true,
            articleValue: articleValue ? false : true,
            cathegory: cathegory ? false : true,
        })
        if (title, articleValue, cathegory) {
            const message = await sendRequest(articleValue, title, cathegory, token)
            if (message.status !== 404) {
                navigate(`/articles/${message.articleId}`)
            } else {
                console.log(message.status)
            }
        }
    }
    if (token) {
        return (
            <div className={"newArticle"}>
                <header className={"articleHeader"}>
                    <div className="titleInput">
                        <input maxLength={50} className={"titleHeader"} onChange={(e) => setTitle(e.target.value)}
                               value={title ?? "title"} type="text"/>
                        {err.titleErr ? <p className={"errorMSG"}>{messages.title}</p> : null}
                    </div>
                </header>
                <main className={"mainArticle"}>
                    <div className={"mainContainer"}>
                        <ReactQuill
                            value={articleValue}
                            onChange={(newValue) => {
                                setArticleValue(newValue);
                            }}
                            modules={config.modules}
                            formats={config.formats}
                            theme={config.theme}
                        />
                        {err.articleValue ? <p className={"errorMSG"}>{messages.articleValue}</p> : null}
                    </div>
                </main>
                <footer className={"footerArticle"}>
                    <div className="footerContainer">
                        <div className="selectCathegory">
                            {cathegories.length >= 1 ?
                                <>
                                    <select onChange={(e) => setCathegory(e.target.value)} name="selectCathegory">
                                        <option>Cathegory</option>
                                        {cathegories.map((i) => <option value={i}>{i}</option>)}
                                    </select>
                                    {err.cathegory ? <p className={"errorMSG"}>{messages.cathegory}</p> : null}

                                </>
                                : null
                            }
                        </div>
                        <button className={"publishBTN"} onClick={publishArticle}>Publish</button>

                    </div>
                </footer>
            </div>
        )

    }
    return <></>

}
export default NewTextArticle
