import ReactQuill from 'react-quill';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userStore} from "../../../store/user";
import "./newTextArticle.css"
import config from "../components/quillConfig";
import sendRequest from "../components/sendRequest";
import 'react-quill/dist/quill.snow.css';
import messages from "../messages"
import useAuth from "../../../hooks/useAuth";

const NewTextArticle = () => {
    const navigate = useNavigate()
    const token = userStore(state => state.userInfo.token)
    const [articleValue, setArticleValue] = useState(null);
    const [title, setTitle] = useState("")
    const [cathegory, setCathegory] = useState(null)
    const [cathegories] = useState(["programming", "lifestyle", "family", "management", "Travel", "Work"])
    const [err, setErr] = useState({
        titleErr: false,
        articleValue: false,
        cathegory: false,
    })

    useAuth(token)
    const publishArticle = async () => {
        const valueLength = articleValue ? articleValue.replace(/<.*?>/g, '').length : 0
        setErr({
            titleErr: title ? false : true,
            articleValue: articleValue && valueLength >= 200 ? false : true,
            cathegory: cathegory ? false : true,
        })
            if (title && articleValue && cathegory && cathegory && valueLength >= 200) {
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
                        <input placeholder={"title"} maxLength={50} className={"titleHeader"} onChange={(e) => setTitle(e.target.value)}
                               value={title} type="text"/>
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
                        <span className="valueLength"> {articleValue ? articleValue.replace(/<.*?>/g, '').length : 0}</span>
                        {err.articleValue ? <p className={"errorMSG"}>{messages.articleValue}</p> : null}
                    </div>
                </main>
                <footer className={"footerArticle"}>
                    <div className="footerContainer">
                        <div className="selectCathegory">
                            {cathegories.length >= 1 ?
                                <>
                                    <select onChange={(e) => setCathegory(e.target.value)} name="selectCathegory">
                                        <option selected={true} disabled={true}>Cathegory</option>
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
