import SubscribeUs from "../components/SubscribeUs";
import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {IMAGE_URL, MOVIE_DETAIL, MOVIE_GENRES, VIDEO_URL} from "../constants/constants";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import movieServices from "../services/movie-services";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import paymentServices from "../services/payment-services";
import {updateCurrentPage} from "../actions/page-actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import ratingServices from "../services/rating-service";
import reviewServices from "../services/review-services";
import Swal from "sweetalert2";
import reactionServices from "../services/reaction-services";
import Review from "../components/Review";

const MovieDetail = () => {
    useEffect(() => {
        loadScripts();
    }, []);

    const location = useLocation();
    const path = location.pathname;

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);
    const isLoggedIn = user.isLoggedIn;
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        if (user.userData !== null) {
            setToken(user.userData.token);
            setUserId(user.userData.id);
        }
    }, [user.userData]);


    const axiosMovieConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
        responseType: "blob",
    }

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    const imgUrl = IMAGE_URL;
    const [error, setError] = useState(null);

    const {slug} = useParams();
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const fetchMovie = async () => {
        const res = await movieServices.getMovieDetail(slug, userId);
        setMovie(res);
        if (res.userRating > 0){
            setRating(res.userRating);
        }
    }

    const [reviews, setReviews] = useState([]);
    const fetchReviews = async () => {
        const res = await reviewServices.getMovieReviews(slug);
        setReviews(res.data);
    }

    useEffect(() => {
        fetchMovie();
        fetchReviews();
    }, [slug, userId]);

    const [canWatch, setCanWatch] = useState(false);
    const fetchUserRights = async () => {
        const res = await movieServices.checkUserRights(movie.id, axiosConfig);
        setCanWatch(res.data);
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserRights();
        }
    }, [isLoggedIn, movie.id]);

    const [relatedMovies, setRelatedMovies] = useState([]);
    const fetchRelatedMovies = async () => {
        const res = await movieServices.getMovieDetailsRelated(movie.id);
        setRelatedMovies(res);
    }

    useEffect(() => {
        fetchRelatedMovies();
    }, [movie.id]);

    const [show, setShow] = useState(false);
    const [playUrl, setPlayUrl] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        fetchVideoData();
        setShow(true);
    }

    const fetchVideoData = async () => {
        try {
            const res = await movieServices.watchMovie(movie.files[0].fileName, axiosMovieConfig);
            console.log(res);
            if (res.status === 200) {
                setError(null);
                const videoBlob = res.data;
                const videoUrl = URL.createObjectURL(videoBlob);
                setPlayUrl(videoUrl);
            } else {
                if (res.responseCode === 403) {
                    setError("You are not authorized to view this video.");
                } else {
                    setError("You are not authorized or movie is not available at the moment.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An unexpected error occurred.");
        }
    };

    // Increase view count
    useEffect(() => {
        let timer;
        if (show) {
            const increaseViewCount = async () => {
                const formData = new FormData();
                formData.append('id', movie.id);
                const res = await movieServices.increaseView(formData);
                if (res && res.responseCode === 200) {
                    console.log("View count increased successfully");
                } else {
                    console.error("Failed to increase view count");
                }
            }

            timer = setTimeout(() => {
                increaseViewCount();
            }, 60000);
            return () => clearTimeout(timer);
        }
    },[show, movie.id]);

    const handleRentMovie = async () => {
        const formData = {
            movieId: movie.id,
            amount: movie.price,
            locale: "vn",
            isPackage: false,
        }

        const res = await paymentServices.createPayment(formData, axiosConfig);
        if (res && res.url){
            dispatch(updateCurrentPage(path));
            setTimeout(() => {
                window.location.href = res.url;
            }, 100);
        }
    }

    const handlePurchasePackage = async () => {
        const formData = {
            packageId: movie.packageId,
            amount: movie.packagePrice,
            locale: "vn",
            isPackage: true,
        }

        const res = await paymentServices.createPayment(formData, axiosConfig);
        if (res && res.url){
            dispatch(updateCurrentPage(path));
            setTimeout(() => {
                window.location.href = res.url;
            }, 100);
        }
    }

    const [trailerId, setTrailerId] = useState(null);

    useEffect(() => {
        const extractTrailerId = (url) => {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        };

        if (movie.trailer) {
            const id = extractTrailerId(movie.trailer);
            setTrailerId(id);
        } else {
            setTrailerId(null);
        }
    }, [movie.trailer]);

    const handleRating = (value) => {
        setRating(value);
    };

    const handleRatingSubmit = async () => {
        const formData = {
            movieId: movie.id,
            value: rating,
        }

        const res = await ratingServices.submitRating(formData, axiosConfig);

        if (res && res.responseCode === 200) {
            console.log("Rating submitted successfully");
        } else {
            console.error("Failed to submit rating");
        }
    }

    useEffect(() => {
        if (rating > 0) {
            handleRatingSubmit();
        }
    }, [rating]);

    return (
        <div>
            {/*Scroll-top*/}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up"></i>
            </button>
            {/*Scroll-top-end*/}

            <main>
                {/*movie-details-area*/}
                <section className="movie-details-area" data-background="/assets/img/bg/movie_details_bg.jpg">
                    <div className="container">
                        <div className="row align-items-center position-relative">
                            <div className="col-xl-4 col-lg-4">
                                <div className="movie-details-img">
                                    <img src={imgUrl+movie.poster} alt="" className={'img-fluid'} style={{border: 'solid 5px #e4d807'}}/>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-8">
                                <div className="movie-details-content">
                                    <h2>{movie.title}</h2>
                                    <h5>[{movie.originalTitle}]</h5>
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
                                                            <Link to={MOVIE_GENRES + genre.slug} className={'pl-1'}> {genre.name} </Link>
                                                            {index < movie.genres.length - 1 && ", "}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span>Unknown Genre</span>
                                                )}
                                            </li>
                                            <li className="release-time">
                                                <span><i className="far fa-calendar-alt"></i>{movie.releaseYear}</span>
                                                <span><i className="far fa-clock"></i> {movie.duration} min</span>
                                            </li>
                                        </ul>
                                        <div className="row" style={{paddingLeft: '5px'}}>
                                            <div className="total-views-count">
                                                <p><i className="far fa-eye"></i> {movie.views}</p>
                                            </div>
                                            <div className="total-views-count">
                                                <p><i className="fas fa-star"></i> {movie.rating} ({movie.ratingCount} rates)</p>
                                            </div>
                                            {isLoggedIn ? (
                                                <div className={'total-views-count d-flex'}>
                                                    <p className={'mx-2'}>Leave your rate: </p>
                                                    <div>
                                                        {[...Array(5)].map((_, index) => {
                                                            const starValue = index + 1;
                                                            return (
                                                                <FontAwesomeIcon
                                                                    key={starValue}
                                                                    icon={faStar}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: starValue <= (hover || rating) ? '#e4d804' : '#e4e5e9'
                                                                    }}
                                                                    onClick={() => handleRating(starValue)}
                                                                    onMouseEnter={() => setHover(starValue)}
                                                                    onMouseLeave={() => setHover(0)}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ) :([])}
                                        </div>
                                    </div>
                                    <h6>Storyline</h6>
                                    <p>{movie.storyLine}</p>
                                    <div className="movie-details-prime">
                                    {isLoggedIn ? ( canWatch ? (
                                                <ul>
                                                    <li>
                                                        <button className="btn" onClick={handleShow}>
                                                            <i className="fas fa-play"></i> Watch Now
                                                        </button>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <ul>
                                                    <li className={'mx-1'}>
                                                        <button className="btn rent-movie-btn"
                                                                onClick={handleRentMovie}>
                                                            <i className="fas fa-ticket-alt"></i> Rent with
                                                            ${movie.price}
                                                        </button>
                                                    </li>
                                                    <li className={'mx-1'}>
                                                        <button className="btn purchase-package-btn"
                                                                onClick={handlePurchasePackage}>
                                                            <i className="fas fa-box-open"></i> Purchase {movie.packageName} with
                                                            ${movie.packagePrice}
                                                        </button>
                                                    </li>
                                                </ul>
                                            )) : (
                                                <ul>
                                                    <li className={'mx-1'}>
                                                        <Link to={'/sign-in'} className="btn rent-movie-btn">
                                                            <i className="fas fa-key"></i> Sign in to watch this movie
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*movie-details-area-end*/}

                {/*episode-area*/}
                <section className="episode-area episode-bg" data-background="/assets/img/bg/episode_bg.jpg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 mt-2">
                                <div className="movie-episode-wrap">
                                    <div className="episode-top-wrap">
                                        <div className="section-title">
                                            <h2 className="title">What people say about this movie?</h2>
                                        </div>
                                    </div>
                                    <Review
                                        movieId={movie.id}
                                        movieSlug={slug}
                                        movieReviewCount={movie.reviewCount}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-5 mb-3">
                                <div className="video-preview mt-3">
                                    <div className="movie-details-content">
                                        <h5>Trailer</h5>
                                        <div style={{position: 'relative', width: '100%', paddingTop: '56.25%'}}>
                                            <iframe
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 'none'
                                                }}
                                                src={`https://www.youtube.com/embed/${trailerId}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <h5 className={'mt-3'}>Director</h5>
                                        <h6 className={'mx-3'}>- {movie.director ? movie.director : 'N/A'}</h6>
                                        <h5 className={'mt-3'}>Stars</h5>
                                        {Array.isArray(movie.mainCasts) && movie.mainCasts.length > 0 ? (
                                            movie.mainCasts.map((cast, index) => (
                                                <h6 key={index} className={'mx-3'}>- {cast.actorName} <span style={{color: '#e4d804'}}>as</span> {cast.characterName}</h6>
                                            ))): ([])}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*episode-area-end*/}

                {/*related-movies-area*/}
                <section className="tv-series-area tv-series-bg" data-background="/assets/img/bg/tv_series_bg02.jpg">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="section-title text-center mb-50">
                                    <h2 className="title">Related movies</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {Array.isArray(relatedMovies) && relatedMovies.length > 0 ? (
                                relatedMovies.map((relatedMovie, index) => (
                                    <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <div className="movie-item mb-50">
                                            <div className="movie-poster">
                                                <Link to={MOVIE_DETAIL + relatedMovie.slug}><img
                                                    src={IMAGE_URL + relatedMovie.poster}
                                                    alt={relatedMovie.title}/></Link>
                                            </div>
                                            <div className="movie-content">
                                                <div className="">
                                                    <div className="row" style={{marginLeft: 0, marginRight: 0}}>
                                                        <div className="col-md-11" style={{paddingLeft: 0}}>
                                                            <h5 className="title" style={{minHeight: '51px'}}><Link
                                                                to={MOVIE_DETAIL + relatedMovie.slug}>{relatedMovie.title}</Link>
                                                            </h5>
                                                        </div>
                                                        <div className="col-md-1 px-0">
                                                            <span style={{color: '#e4d804'}}>{relatedMovie.releaseYear}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bottom">
                                                    <ul>
                                                        <li>
                                                            <span className="quality">{relatedMovie.classification}</span>
                                                            <span className="quality mx-1">{relatedMovie.videoMode}</span>
                                                        </li>
                                                        <li>
                                                            <span className="duration"><i className="far fa-clock"></i> {relatedMovie.duration} min</span>
                                                            <span className="rating"><i
                                                                className="fas fa-star"></i> {relatedMovie.rating} ({relatedMovie.ratingCount})</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : ([])}
                        </div>
                    </div>
                </section>
                {/*related-movies-area-end*/}

                <SubscribeUs/>
            </main>

            {/* Popup Video */}
            <Modal show={show}
                   onHide={handleClose}
                   size={'xl'}
                   centered
            >
                <div className={'text-right video-modal-header'}>
                    <button className={'video-modal-close-btn'} onClick={handleClose}><FontAwesomeIcon icon={faXmark}/></button>
                </div>
                {error && (
                    <div className="error-message" style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>
                        <strong>{error}</strong>
                    </div>
                )}
                {playUrl && !error && (
                    <video controls autoPlay width="100%">
                        <source src={playUrl} type="video/mp4" />
                    </video>
                )}
            </Modal>
        </div>
    );
}

export default MovieDetail;
