import "./Footer.css"
const Footer = () => {
    return <>
        <footer className="s-footer">
            <div className="s-footer__bottom">
                <div className="row">
                    <div className="col-full">
                        <div className="s-footer__copyright">
                            <span>© Copyright Philosophy {new Date().getFullYear()}</span>
                            <span>Developed by <a href="https://github.com/Tony-Milukov">Tony Milukov</a></span> <br/>
                            <br/>
                            <span>HTML & CSS template by :<a href="https://colorlib.com/"> Colorlib</a></span>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    </>
}
export default Footer
