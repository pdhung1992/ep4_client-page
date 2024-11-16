import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import authServices from "../services/auth-services";
import {MOVIE_GENRES} from "../constants/constants";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth);
    const isLogin = user.isLoggedIn;
    useEffect(() => {
        loadScripts();
    }, []);

    const handleLogout = async () => {
        const isLogedOut = await authServices.logout();
        if (isLogedOut){
            dispatch({type: 'LOGOUT'});
            navigate('/sign-in');
        }
    }

    const [keyword, setKeyword] = useState('');
    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    }
    const handleSearch = (e) => {
        if (keyword.trim() !== ''){
            navigate(`/search?s=${keyword}`);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch();
        }, 1000);

        return () => clearTimeout(timer);
    }, [keyword]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return(
        <div>
            {/*header-area*/}
            <header className="header-style-two">
                <div id="sticky-header" className="menu-area">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                                <div className="menu-wrap">
                                    <nav className="menu-nav show">
                                        <div className="logo">
                                            <Link to={'/'}>
                                                <img src="/assets/img/logo/logo.png" alt="Logo" className={'img-fluid'} style={{width: '150px'}}/>
                                            </Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                                <li className="menu-item">
                                                    <Link to={'/'}>Home</Link>
                                                </li>
                                                <li className="menu-item">
                                                    <Link to={MOVIE_GENRES + 'action'}>Movie</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/pricing'}>Pricing</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/contact'}>contacts</Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="header-action d-none d-md-block">
                                            <ul>
                                                <li className="d-none d-xl-block">
                                                    <div className="footer-search">
                                                        <form>
                                                            <input type="text"
                                                                   placeholder="Find Favorite Movie"
                                                                   value={keyword}
                                                                   onChange={onChangeKeyword}
                                                                   onKeyDown={handleKeyDown}
                                                            />
                                                            <button type={'button'}><i className="fas fa-search"></i></button>
                                                        </form>
                                                    </div>
                                                </li>
                                                {isLogin ? (
                                                    <li className="header-user-name">
                                                        <Link to={'/movie'}>Hello, {user.userData.fullName}</Link>
                                                    </li>
                                                ) : ([])}
                                                {isLogin ? (
                                                    <li className="header-btn"><button onClick={handleLogout} className="btn">Sign out</button>
                                                    </li>
                                                ) : (
                                                    <li className="header-btn"><Link to={'/sign-in'} className="btn">Sign In</Link></li>
                                                )}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>

                                {/*Mobile Menu */}
                                <div className="mobile-menu">
                                    <div className="close-btn"><i className="fas fa-times"></i></div>

                                    <nav className="menu-box">
                                        <div className="nav-logo"><a href="index.html"><img src="/assets/img/logo/logo.png" alt="" title=""/></a>
                                        </div>
                                        <div className="menu-outer">
                                            {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
                                        </div>
                                        <div className="social-links">
                                            <ul className="clearfix">
                                                <li><a href="#"><span className="fab fa-twitter"></span></a></li>
                                                <li><a href="#"><span className="fab fa-facebook-square"></span></a></li>
                                                <li><a href="#"><span className="fab fa-pinterest-p"></span></a></li>
                                                <li><a href="#"><span className="fab fa-instagram"></span></a></li>
                                                <li><a href="#"><span className="fab fa-youtube"></span></a></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="menu-backdrop"></div>
                                {/*End Mobile Menu*/}

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*header-area-end*/}
        </div>
    )
}

export default Header;
