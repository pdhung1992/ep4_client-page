import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import Movie from "../pages/Movie";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import Footer from "../components/Footer";
import MovieDetail from "../pages/MovieDetail";
import {MOVIE_GENRES} from "../constants/constants";
import Search from "../pages/Search";


const Layout = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={MOVIE_GENRES + ':slug'} element={<Movie/>}/>
                <Route path={'/movie/detail/:slug'} element={<MovieDetail/>}/>
                <Route path={'/pricing'} element={<Pricing/>}/>
                <Route path={'/contact'} element={<Contact/>}/>
                <Route path={'/search'} element={<Search/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default Layout;
