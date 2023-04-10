import {useState} from "react";
import {userStore} from "../../../store/user";

const ChangeUserDataInput = (props) => {
    if (props.changeType == "job" || props.changeType === "description" || props.changeType === "lastname" || props.changeType === "firstname" || props.changeType === "github_link" || props.changeType === "instagram_link") {
        const token = userStore(state => state.userInfo.token)

        const [err, setErr] = useState(false)
        const [editInput, setEditInput] = useState(false);
        const [newData, setNewData] = useState(null)

        const changeUserData = async (e) => {
            e.preventDefault()
            if (editInput && props.user) {
                let myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`)
                myHeaders.append("Content-Type", "application/json");
                let body = JSON.stringify({
                    "changeType": props.changeType,
                    "name": newData
                });
                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: body,
                };

                try {
                    const message = await fetch("http://localhost:5000/user/changeUser", requestOptions)
                    const parsedMessage = await message.json();
                    if (parsedMessage.status == 303) {
                        setErr(parsedMessage)
                        console.log(err)
                    } else {
                        setErr(false)
                        props.handler ? props.handler() : null
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            setEditInput(!editInput)
        }

        return <>
            <form onSubmit={(e) => changeUserData(e)} className="form-group">
                <label className="col-md-2 col-sm-3 col-xs-12 control-label">{props.title}</label>
                <div className="col-md-10 col-sm-9 col-xs-12">
                    {props.isTextArea ? <textarea maxLength={"150"} onChange={(e) => setNewData(e.target.value)}
                                                  readOnly={!editInput} type="text"
                                                  className="form-control"
                                                  value={newData !== null ? newData : props.user ? props.user[props.changeType] ?? null : null}/> :
                        <input onChange={(e) => setNewData(e.target.value)}
                               readOnly={!editInput} type="text"
                               className="form-control"
                               value={newData !== null ? newData : props.user ? props.user[props.changeType] ?? null : null}/>}

                    <button onClick={(e) => changeUserData(e)} className={"editBtn"}>
                        {!editInput ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                            </svg>}
                    </button>
                </div>
                <br/>
                <br/>
                {err.message ? <div className="help-block">{err.message}</div> : null}
            </form>
        </>
    } else {
        throw new Error(`Is not allowed to change ${props.changeType}!!`)
    }
}
export default ChangeUserDataInput
