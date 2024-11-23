import {useEffect, useState} from "react";
import {loadScripts} from "../../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import userMovieService from "../../services/user-movie-service";
import { format } from 'date-fns';
import {updateCurrentPage} from "../../actions/page-actions";
import paymentServices from "../../services/payment-services";
import Swal from "sweetalert2";



const UserMovies = () => {
    useEffect(() => {
        loadScripts()
    }, []);

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);
    const token = user.userData.token;

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10);
    const [pageArr, setPageArr] = useState([]);
    const [search, setSearch] = useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const [movies, setMovies] = useState([]);
    const fetchMovies = async () => {
        const res = await userMovieService.getUserMovies(pageNo, search, axiosConfig);
        setMovies(res);
        setPageArr(Array.from({length: res.totalPages}, (v, i) => i + 1));
    }

    useEffect(() => {
        fetchMovies();
    },[pageNo, search]);

    const handleBuyAgain = async (movie) => {
        const formData = {
            movieId: movie.movieId,
            amount: movie.moviePrice,
            locale: "vn",
            isPackage: false,
        }

        const res = await paymentServices.createPayment(formData, axiosConfig);
        const path = `/movie/detail/${movie.slug}`;
        if (res && res.url){
            dispatch(updateCurrentPage(path));
            setTimeout(() => {
                window.location.href = res.url;
            }, 100);
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Try again later.',
                background: '#1a1a1a',
                color: '#f27474',
                confirmButtonColor: '#f27474'
            });
        }
    }


    return (
        <div>
            <div className="contact-form-wrap">
                <div className={'row contact-form'}>
                    <div className="col-md-6">
                        <div className="widget-title mb-50">
                            <h5 className="title">Movies</h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               placeholder="Search your movies..."
                               className={'form-custom-input'}
                               value={search}
                               onChange={onChangeSearch}
                               name={'newPassword'}
                        />
                    </div>
                </div>
                <div className="contact-form">
                    <table className="table" style={{color: '#fff'}}>
                        <thead>
                        <tr>
                            <th scope="col">Movie</th>
                            <th scope="col">Expired at</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(movies.data) && movies.data.length > 0 ? movies.data.map((movie, index) => (
                            <tr key={index}>
                                <td>{movie.movieTitle}</td>
                                <td>
                                    {new Date(movie.expiredAt) <= new Date()
                                        ? (
                                            <span style={{color: '#e4d804'}}>Expired!</span>
                                        )
                                        : format(new Date(movie.expiredAt), 'yyyy-MMM-dd HH:mm:ss')}
                                </td>
                                <td>
                                    {new Date(movie.expiredAt) <= new Date() ? (
                                        <span className={'account-table-action'} onClick={() => handleBuyAgain(movie)}>
                                            Buy Again
                                        </span>
                                    ) : (
                                        <span className={'account-table-action'}>
                                            Watch
                                        </span>
                                    )}
                                </td>
                            </tr>
                        )) : ([])}
                        </tbody>
                    </table>
                    {!Array.isArray(movies.data) || movies.data.length === 0 ? (
                        <div className="text-center">
                            <h5>No movie found.</h5>
                        </div>
                    ) : ([])}
                    <div className={'row'}>
                        <div className="col">
                            {movies.toItem > 0 ? (
                                <strong>Showing {movies.fromItem} to {movies.toItem} of {movies.totalItems} entries</strong>
                            ) : ([])}
                        </div>
                        <div className="col">
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm justify-content-end">
                                    {movies.currentPage > 1 ? (
                                        <li className="page-item">
                                            <button className="page-link"
                                                    style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                    onClick={() => {
                                                setPageNo(pageNo - 1)
                                            }}>Previous
                                            </button>
                                        </li>
                                    ) : ([])}
                                    {Array.isArray(pageArr) && pageArr.length > 0 ? pageArr.map((page, index) => (
                                        <div>
                                            {page === pageNo ? (
                                                <li className="page-item" key={index}>
                                                    <button className="page-link text-warning"
                                                            style={{backgroundColor: '#100f18'}}
                                                            onClick={() => setPageNo(page)}>{page}</button>
                                                </li>
                                            ) : (
                                                <li className="page-item" key={index}>
                                                    <button className="page-link"
                                                            style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                            onClick={() => setPageNo(page)}>{page}</button>
                                                </li>
                                            )}
                                        </div>
                                    )) : ([])}
                                    {movies.currentPage < movies.totalPages ? (
                                        <li className="page-item">
                                            <button className="page-link"
                                                    style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                    onClick={() => {
                                                setPageNo(pageNo + 1)
                                            }}>Next
                                            </button>
                                        </li>
                                    ) : ([])}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMovies;
