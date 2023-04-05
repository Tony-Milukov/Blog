import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Syntax from 'quill/modules/syntax';

import {useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";
import {userStore} from "../../../store/user";
import "./newTextArticle.css"
const NewTextArticle = () => {
    useEffect(() => {
        !token ? navigate("/login") : null
    }, [])

    const token = userStore(state => state.userInfo.token)

    const [value, setValue] = useState('');

    const navigate = useNavigate()

        const handleChange = (newValue) => {
            setValue(newValue);
        }

        const modules = {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' },{'code-block':true}],

                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean']
            ]
        };

        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'script',
            'indent', 'direction',
            'size', 'color', 'background', 'font',
            'align', 'code-block'
        ];

        const config =    {
            modules: modules,
            formats: formats,
            theme: 'snow'
        };

   if (token) {
        return  (
            <>
                <ReactQuill
                    value={value}
                    onChange={handleChange}
                    modules={config.modules}
                    formats={config.formats}
                    theme={config.theme}
                />
                    <button onClick={() => console.log(value)}>LOG</button>
            </>
        )

   }
       return <></>

}
export default NewTextArticle
