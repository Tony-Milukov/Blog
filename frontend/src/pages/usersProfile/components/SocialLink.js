const SocialLink = ({link, name}) => {
    console.log(link)
    return link ? <li><a target={"_blank"} href={ link }>{name}</a></li> : null
}
export default SocialLink
