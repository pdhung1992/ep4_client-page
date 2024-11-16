import Layout from "../layouts/Layout";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <footer>
            <div className="footer-top-wrap">
                <div className="container">
                    <div className="footer-menu-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="footer-logo">
                                    <a href="index.html"><img src="img/logo/logo.png" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="footer-menu">
                                    <nav>
                                        <ul className="navigation">
                                            <li><Link to={'/'}>Home</Link></li>
                                            <li><Link to={'/movie'}>Movie</Link></li>
                                            <li><Link to={'/pricing'}>Pricing</Link></li>
                                            <li><Link to={'/contact'}>contact</Link></li>
                                        </ul>
                                        <div className="footer-search">
                                            <form action="#">
                                                <input type="text" placeholder="Find Favorite Movie"/>
                                                <button><i className="fas fa-search"></i></button>
                                            </form>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2024. All Rights Reserved By <Link to={'/'}>MovieX</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="payment-method-img text-center text-md-right">
                                <img src="/assets/img/images/card_img.png" alt="img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
