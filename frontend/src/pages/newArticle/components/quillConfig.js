import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{'header': [1, 2, 3, 4, 5, false]}],
        ['bold', 'italic', 'underline', 'strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}, {'code-block': true}],

        [{'size': ['small', false, 'large', 'huge']}],
        [{'color': []}, {'background': []}],
        [{'font': []}],
        [{'align': []}],
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

const config = {
    modules: modules,
    formats: formats,
    theme: 'snow'
};
export default config
