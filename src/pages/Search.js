import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {IMAGE_URL, MOVIE_DETAIL} from "../constants/constants";
import {loadScripts} from "../helpers/script-helpers";
import movieServices from "../services/movie-services";


const Search = () => {
    useEffect(() => {
        loadScripts();
    }, []);
    const imgUrl = IMAGE_URL;

    const [keyword, setKeyword] = useState('');
    const location = useLocation();

    const getKeyword = () => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('s') || '';
    };

    useEffect(() => {
        const keywordFromUrl = getKeyword();
        setKeyword(keywordFromUrl);
    }, [location]);

    const [relatedKeywords, setRelatedKeywords] = useState([]);
    const fetchRelatedKeywords = async () => {
        const res = await movieServices.searchRelatedKeywords(keyword);
        setRelatedKeywords(res);
    }

    useEffect(() => {
        fetchRelatedKeywords();
    }, [keyword]);

    const [searchResults, setSearchResults] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchSearchResults = async (page = 1) => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        try {
            const res = await movieServices.searchMovies(keyword, page);
            const newMovies = res;

            if (!newMovies || newMovies.length < limit) {
                setHasMore(false);
            }

            setSearchResults((prevMovies) => page === 1 ? newMovies : [...prevMovies, ...newMovies]);

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
            setSearchResults([]);

            await new Promise((resolve) => setTimeout(resolve, 0));

            fetchSearchResults(1);
        };

        resetAndFetch();
    }, [relatedKeywords, keyword]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchSearchResults(pageNo);
        }
    };

    return (
        <div>
            {/*Scroll-top*/}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up"></i>
            </button>
            {/*Scroll-top-end*/}

            <main>
                {/*breadcrumb-area*/}
                <section data-background="/assets/img/bg/movie_bg.jpg" style={{minHeight: '80vh'}}>
                    <div className="container">
                        <div className="align-items-end pb-40 pt-40 movie-display">
                            <div className="col-lg-12">
                                <div className="section-title text-center text-lg-left">
                                    <h3>Related keywords: </h3>
                                </div>
                                <div className="related-keywords">
                                    {relatedKeywords.length > 0 ? relatedKeywords.map((relatedKeyword, index) => (
                                        <div className={'related-keyword'} key={index}>
                                            <Link to={`/search?s=${relatedKeyword}`}>
                                                <h5>{relatedKeyword}</h5>
                                            </Link>
                                        </div>
                                    )) : []}
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-end pb-40 movie-display">
                            <div className="col-lg-12">
                                <div className="section-title text-center text-lg-left">
                                    <h3>Results for '{keyword}': </h3>
                                </div>
                                <div className="row tr-movie-active">
                                    {Array.isArray(searchResults) && searchResults.length > 0 ? searchResults.map((movie, index) => (
                                        <div className={'movie-card mx-2'} key={index}>
                                            <div className="movie-item movie-item-three mb-50">
                                                <div className="movie-poster">
                                                    <img src={imgUrl + movie.image} alt={movie.title}/>
                                                    <ul className="overlay-btn">
                                                        <li><Link to={MOVIE_DETAIL + movie.slug} className="btn">Watch
                                                            Now</Link></li>
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
                                <div className="col-md-12 pt-30 d-flex align-items-center justify-content-center">
                                    {hasMore && searchResults.length > 0 && (
                                        <button className={'btn'} onClick={handleLoadMore} disabled={isLoading} style={{maxWidth: '300px'}}>
                                            {isLoading ? 'Loading...' : 'Load more results'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Search;
