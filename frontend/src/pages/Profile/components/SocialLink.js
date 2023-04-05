const SocialLink = (props) => {
    return <>
        {props.userProfile ? props.userProfile[props.linkType] ?
            <a target="_blank" href={props.userProfile[props.linkType]} >
                {props.icon}
            </a> : null : null}
    </>
}
export default SocialLink
