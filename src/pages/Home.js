import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slider from 'react-slick';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubscribeUs from "../components/SubscribeUs";
import movieServices from "../services/movie-services";
import {
    BEST_MOVIE_CATEGORY_ID,
    COMING_SOON_MOVIE_CATEGORY_ID,
    HOT_MOVIE_CATEGORY_ID,
    IMAGE_URL,
    MOVIE_DETAIL, MOVIE_GENRES,
    NEW_MOVIE_CATEGORY_ID, ONLY_ON_MOVIEX_CATEGORY_ID,
    TRENDING_MOVIE_CATEGORY_ID
} from "../constants/constants";
import {Link} from "react-router-dom";
import PricingComp from "../components/PricingComp";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const Home = () => {
    useEffect(() => {
        loadScripts();
    },[]);
    const imgUrl = IMAGE_URL;

    const [showAtHomeMovies, setShowAtHomeMovies] = useState([]);
    const fetchShowAtHomeMovies = async () => {
        const res = await movieServices.getShowAtHomeMovies();
        setShowAtHomeMovies(res);
    }

    const [newMovies, setNewMovies] = useState([]);
    const fetchNewMovies = async () => {
        const res = await movieServices.getHomeMovieByCategory(NEW_MOVIE_CATEGORY_ID);
        setNewMovies(res);
    }

    const [trendingMovies, setTrendingMovies] = useState([]);
    const fetchTrendingMovies = async () => {
        const res = await movieServices.getHomeMovieByCategory(TRENDING_MOVIE_CATEGORY_ID);
        setTrendingMovies(res);
    }

    const [hotMovies, setHotMovies] = useState([]);
    const fetchHotMovies = async () => {
        const res = await movieServices.getHomeMovieByCategory(HOT_MOVIE_CATEGORY_ID);
        setHotMovies(res);
    }

    const [comingSoonMovies, setComingSoonMovies] = useState([]);
    const fetchComingSoonMovies = async () => {
        const res = await movieServices.getHomeMovieByCategory(COMING_SOON_MOVIE_CATEGORY_ID);
        setComingSoonMovies(res);
    }

    const [onlyOnMoviexMovies, setOnlyOnMoviexMovies] = useState([]);
    const fetchOnlyOnMoviexMovies = async () => {
        const res = await movieServices.getHomeMovieByCategory(ONLY_ON_MOVIEX_CATEGORY_ID);
        setOnlyOnMoviexMovies(res);
    }

    const [bestMovies, setBestMovies] = useState([]);
    const fetchBestMovies = async () => {
        const res = await movieServices.getHomeMovieByCategory(BEST_MOVIE_CATEGORY_ID);
        setBestMovies(res);
    }

    useEffect(() => {
        fetchShowAtHomeMovies();
        fetchNewMovies();
        fetchTrendingMovies();
        fetchHotMovies();
        fetchComingSoonMovies();
        fetchOnlyOnMoviexMovies();
        fetchBestMovies();
    }, []);

    const slickCategorySettings = {
        autoplay: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
    }

    return (
        <div>
            {/*Scroll-top*/}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up"></i>
            </button>
            {/*Scroll-top-end*/}

            <main>
                {/*slider-area*/}
                <section className="slider-area slider-bg" data-background="/assets/img/banner/s_slider_bg.jpg">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                        }}
                        className="slider-active"
                        loop={true}
                    >
                        {Array.isArray(showAtHomeMovies) && showAtHomeMovies.length > 0 ? showAtHomeMovies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className="slider-item">
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6 order-0 order-lg-2">
                                                <div className="slider-img text-center text-lg-right">
                                                    <img src={imgUrl + movie.image} alt={movie.title} style={{border: 'solid #e4d807 5px'}}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="banner-content">
                                                    <h2 className="title mb-0">{movie.title}</h2>
                                                    <h6 className="sub-title mb-2">[{movie.originalTitle}]</h6>
                                                    <div className="banner-meta">
                                                        <ul>
                                                            <li className="quality">
                                                                <span>{movie.classification}</span>
                                                                <span>{movie.videoMode}</span>
                                                            </li>
                                                            <li className="category">
                                                                {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                                    movie.genres.map((genre, index) => (
                                                                        <span key={index}>
                                                                            <span className={'pl-1'}> {genre.name} </span>
                                                                            {index < movie.genres.length - 1 && ", "}
                                                                        </span>
                                                                    ))
                                                                ) : (
                                                                    <span>No genres available</span>
                                                                )}
                                                            </li>

                                                            <li className="release-time">
                                                                <span><i
                                                                    className="far fa-calendar-alt"></i>{movie.releaseYear}</span>
                                                                <span><i
                                                                    className="far fa-clock"></i> {movie.duration} min</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <Link to={MOVIE_DETAIL+movie.slug} className="banner-btn btn">
                                                        <i className="fas fa-play"></i> Watch Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )) : ([])}
                    </Swiper>
                </section>
                {/*slider-area-end*/}

                {/*new-movie-area*/}
                <section className="ucm-area top-rated-movie ucm-bg2" data-background="/assets/img/bg/ucm_bg02.jpg">
                    <div className="container">
                        <div className="row align-items-end mb-25 home-slide-content">
                            <div className="col-lg-6">
                                <div className="section-title title-style-three text-center text-lg-left">
                                    <h2 className="title">New Release Movies</h2>
                                </div>
                            </div>
                        </div>
                        <div className="home-slide-content" id="newContent">
                            <div className="tab-pane fade show active" id="bestMovie" role="tabpanel"
                                 aria-labelledby="bestMovie">
                                <div className="best-slider-container">
                                    <Slider {...slickCategorySettings}>
                                        {Array.isArray(newMovies) && newMovies.length > 0 ? newMovies.map((movie, index) => (
                                            <div className="movie-item movie-item-two mb-30">
                                                <div className="movie-poster">
                                                    <Link to={MOVIE_DETAIL + movie.slug}><img
                                                        src={IMAGE_URL + movie.poster} alt=""/></Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h5 className="title slide-title">
                                                        <Link to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link></h5>
                                                    <span className="rel">
                                                      {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                          movie.genres.map((genre, index) => (
                                                              <span key={index}>
                                                                <Link to={MOVIE_GENRES + genre.slug} className={'pl-1'}> {genre.name} </Link>
                                                              {index < movie.genres.length - 1 && ", "}
                                                          </span>
                                                          ))
                                                      ) : (
                                                          <span>No genres available</span>
                                                      )}
                                                    </span>
                                                    <div className="movie-content-bottom">
                                                        <ul>
                                                            <li className="tag">
                                                                <a href="#">{movie.classification}</a>
                                                                <a href="#">{movie.videoMode}</a>
                                                            </li>
                                                            <li>
                                                                <span className="like"><i className="fas fa-star" style={{color: '#e4d804'}}></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ([])}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*new-movie-area-end*/}

                {/*trending-movie-area*/}
                <section className="ucm-area ucm-bg2" data-background="/assets/img/bg/ucm_bg02.jpg">
                    <div className="container">
                        <div className="row align-items-end mb-25 home-slide-content">
                            <div className="col-lg-6">
                                <div className="section-title title-style-three text-center text-lg-left">
                                    <h2 className="title">Trending</h2>
                                </div>
                            </div>
                        </div>
                        <div className="home-slide-content" id="trendContent">
                            <div className="tab-pane fade show active" id="bestMovie" role="tabpanel"
                                 aria-labelledby="bestMovie">
                                <div className="best-slider-container">
                                    <Slider {...slickCategorySettings}>
                                        {Array.isArray(trendingMovies) && trendingMovies.length > 0 ? trendingMovies.map((movie, index) => (
                                            <div className="movie-item movie-item-two mb-30">
                                            <div className="movie-poster">
                                                    <Link to={MOVIE_DETAIL + movie.slug}><img
                                                        src={IMAGE_URL + movie.poster} alt=""/></Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h5 className="title slide-title">
                                                        <Link to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link></h5>
                                                    <span className="rel">
                                                      {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                          movie.genres.map((genre, index) => (
                                                              <span key={index}>
                                                            <Link to={MOVIE_GENRES + genre.slug}
                                                                  className={'pl-1'}> {genre.name} </Link>
                                                                  {index < movie.genres.length - 1 && ", "}
                                                          </span>
                                                          ))
                                                      ) : (
                                                          <span>No genres available</span>
                                                      )}
                                                    </span>
                                                    <div className="movie-content-bottom">
                                                        <ul>
                                                            <li className="tag">
                                                                <a href="#">{movie.classification}</a>
                                                                <a href="#">{movie.videoMode}</a>
                                                            </li>
                                                            <li>
                                                                <span className="like"><i
                                                                    className="fas fa-star" style={{color: '#e4d804'}}></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ([])}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*trending-movie-area-end*/}

                {/*best-movie-area*/}
                <section className="ucm-area ucm-bg2" data-background="/assets/img/bg/ucm_bg02.jpg">
                    <div className="container">
                        <div className="row align-items-end mb-25 home-slide-content">
                            <div className="col-lg-6">
                                <div className="section-title title-style-three text-center text-lg-left">
                                    <h2 className="title">Best on MovieX</h2>
                                </div>
                            </div>
                        </div>
                        <div className="home-slide-content" id="bestContent">
                            <div className="tab-pane fade show active" id="bestMovie" role="tabpanel"
                                 aria-labelledby="bestMovie">
                                <div className="best-slider-container">
                                    <Slider {...slickCategorySettings}>
                                        {Array.isArray(bestMovies) && bestMovies.length > 0 ? bestMovies.map((movie, index) => (
                                            <div className="movie-item movie-item-two mb-30">
                                            <div className="movie-poster">
                                                    <Link to={MOVIE_DETAIL + movie.slug}><img
                                                        src={IMAGE_URL + movie.poster} alt=""/></Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h5 className="title slide-title">
                                                        <Link to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link></h5>
                                                    <span className="rel">
                                                      {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                          movie.genres.map((genre, index) => (
                                                              <span key={index}>
                                                            <Link to={MOVIE_GENRES + genre.slug}
                                                                  className={'pl-1'}> {genre.name} </Link>
                                                                  {index < movie.genres.length - 1 && ", "}
                                                          </span>
                                                          ))
                                                      ) : (
                                                          <span>No genres available</span>
                                                      )}
                                                    </span>
                                                    <div className="movie-content-bottom">
                                                        <ul>
                                                            <li className="tag">
                                                                <a href="#">{movie.classification}</a>
                                                                <a href="#">{movie.videoMode}</a>
                                                            </li>
                                                            <li>
                                                                <span className="like"><i
                                                                    className="fas fa-star" style={{color: '#e4d804'}}></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ([])}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*best-movie-area-end*/}

                {/*pricing-area*/}
                <PricingComp/>
                {/*pricing-area-end*/}

                {/*hot-movie-area*/}
                {/*<section className="ucm-area top-rated-movie ucm-bg2" data-background="/assets/img/bg/ucm_bg02.jpg">
                    <div className="container">
                        <div className="row align-items-end mb-25 home-slide-content">
                            <div className="col-lg-6">
                                <div className="section-title title-style-three text-center text-lg-left">
                                    <h2 className="title">Hot Movies</h2>
                                </div>
                            </div>
                        </div>
                        <div className="home-slide-content" id="hotContent">
                            <div className="tab-pane fade show active" id="bestMovie" role="tabpanel"
                                 aria-labelledby="bestMovie">
                                <div className="best-slider-container">
                                    <Slider {...slickCategorySettings}>
                                        {Array.isArray(hotMovies) && hotMovies.length > 0 ? hotMovies.map((movie, index) => (
                                            <div className="movie-item movie-item-two mb-30">
                                                <div className="movie-poster">
                                                    <Link to={MOVIE_DETAIL + movie.slug}><img
                                                        src={IMAGE_URL + movie.poster} alt=""/></Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h5 className="title slide-title">
                                                        <Link to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link></h5>
                                                    <span className="rel">
                                                      {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                          movie.genres.map((genre, index) => (
                                                              <span key={index}>
                                                            <Link to={MOVIE_GENRES + genre.slug}
                                                                  className={'pl-1'}> {genre.name} </Link>
                                                                  {index < movie.genres.length - 1 && ", "}
                                                          </span>
                                                          ))
                                                      ) : (
                                                          <span>No genres available</span>
                                                      )}
                                                    </span>
                                                    <div className="movie-content-bottom">
                                                        <ul>
                                                            <li className="tag">
                                                                <a href="#">{movie.classification}</a>
                                                                <a href="#">{movie.videoMode}</a>
                                                            </li>
                                                            <li>
                                                                <span className="like"><i
                                                                    className="fas fa-star" style={{color: '#e4d804'}}></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ([])}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*hot-movie-area-end*/}

                {/*coming-soon-movie-area*/}
                <section className="ucm-area top-rated-movie ucm-bg2" data-background="/assets/img/bg/ucm_bg02.jpg">
                    <div className="container">
                        <div className="row align-items-end mb-25 home-slide-content">
                            <div className="col-lg-6">
                                <div className="section-title title-style-three text-center text-lg-left">
                                    <h2 className="title">Coming soon</h2>
                                </div>
                            </div>
                        </div>
                        <div className="home-slide-content" id="comingContent">
                            <div className="tab-pane fade show active" id="bestMovie" role="tabpanel"
                                 aria-labelledby="bestMovie">
                                <div className="best-slider-container">
                                    <Slider {...slickCategorySettings}>
                                        {Array.isArray(comingSoonMovies) && comingSoonMovies.length > 0 ? comingSoonMovies.map((movie, index) => (
                                            <div className="movie-item movie-item-two mb-30">
                                                <div className="movie-poster">
                                                    <Link to={MOVIE_DETAIL + movie.slug}><img
                                                        src={IMAGE_URL + movie.poster} alt=""/></Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h5 className="title slide-title">
                                                        <Link to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link></h5>
                                                    <span className="rel">
                                                      {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                          movie.genres.map((genre, index) => (
                                                              <span key={index}>
                                                            <Link to={MOVIE_GENRES + genre.slug}
                                                                  className={'pl-1'}> {genre.name} </Link>
                                                                  {index < movie.genres.length - 1 && ", "}
                                                          </span>
                                                          ))
                                                      ) : (
                                                          <span>No genres available</span>
                                                      )}
                                                    </span>
                                                    <div className="movie-content-bottom">
                                                        <ul>
                                                            <li className="tag">
                                                                <a href="#">{movie.classification}</a>
                                                                <a href="#">{movie.videoMode}</a>
                                                            </li>
                                                            <li>
                                                                <span className="like"><i
                                                                    className="fas fa-star" style={{color: '#e4d804'}}></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ([])}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*coming-soon-movie-area-end*/}

                {/*only-on-moviex-area*/}
                <section className="ucm-area top-rated-movie ucm-bg2" data-background="/assets/img/bg/ucm_bg02.jpg">
                    <div className="container">
                        <div className="row align-items-end mb-25 home-slide-content">
                            <div className="col-lg-6">
                                <div className="section-title title-style-three text-center text-lg-left">
                                    <h2 className="title">Only on MovieX</h2>
                                </div>
                            </div>
                        </div>
                        <div className="home-slide-content" id="onlyContent">
                            <div className="tab-pane fade show active" id="bestMovie" role="tabpanel"
                                 aria-labelledby="bestMovie">
                                <div className="best-slider-container">
                                    <Slider {...slickCategorySettings}>
                                        {Array.isArray(onlyOnMoviexMovies) && onlyOnMoviexMovies.length > 0 ? onlyOnMoviexMovies.map((movie, index) => (
                                            <div className="movie-item movie-item-two mb-30">
                                                <div className="movie-poster">
                                                    <Link to={MOVIE_DETAIL + movie.slug}><img
                                                        src={IMAGE_URL + movie.poster} alt=""/></Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h5 className="title slide-title">
                                                        <Link to={MOVIE_DETAIL + movie.slug}>{movie.title}</Link></h5>
                                                    <span className="rel">
                                                      {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                                          movie.genres.map((genre, index) => (
                                                              <span key={index}>
                                                            <Link to={MOVIE_GENRES + genre.slug} className={'pl-1'}> {genre.name} </Link>
                                                                  {index < movie.genres.length - 1 && ", "}
                                                          </span>
                                                          ))
                                                      ) : (
                                                          <span>No genres available</span>
                                                      )}
                                                    </span>
                                                    <div className="movie-content-bottom">
                                                        <ul>
                                                            <li className="tag">
                                                                <a href="#">{movie.classification}</a>
                                                                <a href="#">{movie.videoMode}</a>
                                                            </li>
                                                            <li>
                                                                <span className="like"><i
                                                                    className="fas fa-star" style={{color: '#e4d804'}}></i> {movie.rating} ({movie.ratingCount})</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ([])}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*only-on-moviex-area-end*/}

                <SubscribeUs/>

            </main>
        </div>
    );
}

export default Home;
