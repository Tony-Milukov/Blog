const AuthInput = (props) => {
    return(
       <>
           <div className="input-field">
               <input onChange={(e) => props.action(e.target.value)} type={props.type} placeholder={props.placeholder}
                      autoComplete="new-password"/>
           </div>
         <p>  {props.error ?? null} </p>
       </>
)
}
export default AuthInput
