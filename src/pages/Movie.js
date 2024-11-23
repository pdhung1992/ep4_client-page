import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import genresServices from "../services/genres-services";
import {IMAGE_URL, MOVIE_DETAIL, MOVIE_GENRES} from "../constants/constants";
import {Link, useParams} from "react-router-dom";
import SubscribeUs from "../components/SubscribeUs";
import movieServices from "../services/movie-services";


const Movie = () => {
    useEffect(() => {
        loadScripts();
    }, []);
    const imgUrl = IMAGE_URL;

    const [genres, setGenres] = useState([]);
    const fetchGenres = async () => {
        const res = await genresServices.getGenres();
        setGenres(res);
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    const {slug} = useParams();
    const currentGenre = genres.find((genre) => genre.slug === slug);

    const [bestMovies, setBestMovies] = useState([]);
    const fetchBestMovies = async () => {
        const res = await movieServices.getBestMoviesByGenre(slug);
        setBestMovies(res);
    }

    useEffect(() => {
        fetchBestMovies();
    }, [slug]);

    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchMovies = async (page = 1) => {

        if (isLoading || !hasMore) return;

        setIsLoading(true);

        try {
            const res = await movieServices.getAllMoviesByGenre(slug, page);
            const newMovies = res;

            if (!newMovies || newMovies.length < limit) {
                setHasMore(false);
            }

            setMovies((prevMovies) => page === 1 ? newMovies : [...prevMovies, ...newMovies]);

            setPageNo(page + 1);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const resetAndFetch = async () => {
            setPageNo(1);
            setHasMore(true);
            setIsLoading(false);
            setMovies([]);

            await new Promise((resolve) => setTimeout(resolve, 0));

            fetchMovies(1);
        };

        resetAndFetch();
    }, [slug]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchMovies(pageNo);
        }
    };

    return(
        <div>
            {/*Scroll-top*/}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up"></i>
            </button>
            {/*Scroll-top-end*/}

            <main>

                {/*breadcrumb-area*/}
                <section data-background="/assets/img/bg/movie_bg.jpg">
                    <div className="container">
                        <div className="row movie-genre-panels pt-5 pb-2">
                            {Array.isArray(genres) && genres.length > 0 ? genres.map((genre, index) => (
                                <div className={'genre-panel'} key={index}>
                                    <Link to={MOVIE_GENRES + genre.slug}>
                                        <div key={index}
                                             className={`panel-content ${genre.slug === slug ? 'active' : ''}`}
                                             style={{backgroundImage: `url(${imgUrl + genre.image})`}}>
                                            <h4>{genre.name}</h4>
                                        </div>
                                    </Link>
                                </div>
                            )) : []}
                        </div>
                    </div>
                </section>
                {/*breadcrumb-area-end*/}

                {/*movie-area*/}
                <section className="movie-area movie-bg" data-background="/assets/img/bg/movie_bg.jpg">
                    <div className="container">
                        {currentGenre && currentGenre.totalMovies > 0 ? (
                            <div>
                                <div className="row align-items-end mb-60 movie-display">
                                    <div className="col-lg-6">
                                        <div className="section-title text-center text-lg-left">
                                            <h2 className="title">Best of {currentGenre ? currentGenre.name : ''}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row tr-movie-active movie-display">
                                    {Array.isArray(bestMovies) && bestMovies.length > 0 ? bestMovies.map((movie, index) => (
                                        <div className={'movie-card mx-2'} key={index}>
                                            <div className="movie-item movie-item-three mb-50">
                                                <div className="movie-poster">
                                                    <img src={imgUrl + movie.image} alt={movie.title}/>
                                                    <ul className="overlay-btn">
                                                        <li><Link to={MOVIE_DETAIL + movie.slug} className="btn">Watch
                                                            Now</Link></li>
                                                        {/*<li><a href="movie-details.html" className="btn">Details</a></li>*/}
                                                    </ul>
                                                </div>
                                                <div className="movie-content">
                                                    <div className="">
                                                        <div className="row" style={{marginLeft: 0, marginRight: 0}}>
                                                            <div className="col-md-11"
                                                                 style={{paddingLeft: 0, paddingRight: 0}}>
                                                                <h5 className="title" style={{minHeight: '51px'}}>
                                                                    <Link
                                                                        to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link>
                                                                </h5>
                                                            </div>
                                                            <div className="col-md-1 px-0">
                                                    <span
                                                        style={{color: '#e4d804'}}>{movie.releaseYear}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bottom">
                                                        <ul>
                                                            <li>
                                                                <span className="quality">{movie.classification}</span>
                                                                <span className="quality mx-1">{movie.videoMode}</span>
                                                            </li>
                                                            <li>
                                                    <span className="duration"><i
                                                        className="far fa-eye"></i> {movie.views}</span>
                                                                <span className="rating"><i
                                                                    className="fas fa-star"></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : []}
                                </div>
                                <div className="row align-items-end mb-60 movie-display">
                                    <div className="col-lg-6">
                                        <div className="section-title text-center text-lg-left">
                                            <h2 className="title">{currentGenre ? `All ${currentGenre.name} movies (${currentGenre.totalMovies})` : ''}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row tr-movie-active movie-display">
                                    {Array.isArray(movies) && movies.length > 0 ? movies.map((movie, index) => (
                                    <div className={'movie-card mx-2'} key={index}>
                                        <div className="movie-item movie-item-three mb-50">
                                            <div className="movie-poster">
                                                <img src={imgUrl + movie.image} alt={movie.title}/>
                                                <ul className="overlay-btn">
                                                    <li><Link to={MOVIE_DETAIL + movie.slug} className="btn">Watch Now</Link></li>
                                                </ul>
                                            </div>
                                            <div className="movie-content">
                                                <div className="">
                                                    <div className="row" style={{marginLeft: 0, marginRight: 0}}>
                                                        <div className="col-md-11"
                                                             style={{paddingLeft: 0, paddingRight: 0}}>
                                                            <h5 className="title" style={{minHeight: '51px'}}>
                                                                <Link
                                                                    to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link>
                                                            </h5>
                                                        </div>
                                                        <div className="col-md-1 px-0">
                                                <span
                                                    style={{color: '#e4d804'}}>{movie.releaseYear}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bottom">
                                                    <ul>
                                                        <li>
                                                            <span className="quality">{movie.classification}</span>
                                                            <span className="quality mx-1">{movie.videoMode}</span>
                                                        </li>
                                                        <li>
                                                <span className="duration"><i
                                                    className="far fa-eye"></i> {movie.views}</span>
                                                            <span className="rating"><i
                                                                className="fas fa-star"></i> {movie.rating} ({movie.ratingCount})</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )) : []}
                                </div>
                                <div className="col-md-12 d-flex align-items-center justify-content-center">
                                    {hasMore && (
                                        <button className={'btn'} onClick={handleLoadMore} disabled={isLoading}>
                                            {isLoading ? 'Loading...' : 'Load More'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="col-md-12 d-flex align-items-center justify-content-center">
                                <h2 className="title">No {currentGenre ? currentGenre.name : ''} movies yet.</h2>
                            </div>
                        )}
                    </div>
                </section>
                {/*movie-area-end*/}

                {/*newsletter-area*/}
                <SubscribeUs/>
                {/*newsletter-area-end*/}
            </main>
        </div>
    )
}


export default Movie;
