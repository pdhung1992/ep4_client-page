import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import reviewServices from "../services/review-services";
import Swal from "sweetalert2";
import reactionServices from "../services/reaction-services";
import {loadScripts} from "../helpers/script-helpers";
import {useSelector} from "react-redux";


const Review = ({movieId, movieSlug, movieReviewCount}) => {

    useEffect(() => {
        loadScripts();
    }, []);

    const user = useSelector(state => state.auth);
    const isLoggedIn = user.isLoggedIn;
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (user.userData !== null) {
            setToken(user.userData.token);
            setUserId(user.userData.id);
        }
    }, [user.userData]);

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }


    const [reviews, setReviews] = useState([]);
    const fetchReviews = async (userId) => {
        const res = await reviewServices.getMovieReviews(movieSlug, userId);
        setReviews(res.data);
    }

    useEffect(() => {
        fetchReviews(userId);
    }, [userId]);

    console.log(reviews)

    const autoResizeTextarea = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const [replyParentId, setReplyParentId] = useState(null);
    const handleShowReplyBox = (reviewId) => {
        setReplyParentId((prevId) => (prevId === reviewId ? null : reviewId));
    }

    const [review, setReview] = useState('');
    const onChangeReview = (e) => {
        setReview(e.target.value);
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            movieId: movieId,
            content: review,
            parentId: replyParentId,
        }

        const res = await reviewServices.createReview(formData, axiosConfig);
        if (res && res.responseCode === 201) {
            if (replyParentId !== null) {
                fetchReplies(replyParentId, userId);
                fetchReviews(userId);
            }else {
                fetchReviews(userId);
            }
            setReview('');
            setReplyParentId(null);
        } else {
            console.log("Failed to submit review");
        }
    }

    const [replies, setReplies] = useState([]);
    const fetchReplies = async (parentId, userId) => {
        const res = await reviewServices.getReviewByParentId(parentId, userId);
        setReplies(res.data);
    };

    const handleShowReplies = (parentId) => {
        fetchReplies(parentId, userId);
    };

    const handleReactionClick = async (id, type) => {
        const formData = {
            reviewId: id,
            reactionType: type,
        }

        const res = await reactionServices.clickReaction(formData, axiosConfig);
        if (res && res.responseCode === 200) {
            if (replyParentId !== null) {
                fetchReplies(replyParentId, userId);
            }else {
                fetchReviews(userId);
            }
            console.log("Reaction submitted successfully");
        } else {
            console.error("Failed to submit reaction");
        }
    }
    return (
        <div>
            <div className="movie-review">
                <div className="contact-form">
                    {isLoggedIn ? (
                        <form onSubmit={handleReviewSubmit}>
                            <div className="row">
                                <div className="col-md-9">
                                                        <textarea
                                                            className={'review-input'}
                                                            name="review"
                                                            placeholder="Leave a review..."
                                                            style={{resize: 'none', overflow: 'hidden'}}
                                                            onInput={(e) => autoResizeTextarea(e)}
                                                            onChange={onChangeReview}
                                                        ></textarea>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    <button type={'submit'} className="btn btn-sm">Send</button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className={'text-center'}>
                            <h6><Link to={'/sign-in'} style={{color: '#e4d804'}}>Log in</Link> to review this movie</h6>
                        </div>
                    )}
                </div>
                <br/>
                <h6>Reviews ({movieReviewCount})</h6>
                {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div className={'review-content'} key={review.id}>
                            <div className={'review-header'}>
                                <div className="row">
                                    <div className="col-md-6 text-left">
                                        <strong>{review.userName}</strong>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        {[...Array(5)].map((_, index) => {
                                            const starValue = index + 1;
                                            return (
                                                <FontAwesomeIcon
                                                    key={starValue}
                                                    icon={faStar}
                                                    style={{
                                                        color: starValue <= review.rating ? '#e4d804' : '#e4e5e9'
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={'review-body'}>
                                <p>{review.content}</p>
                            </div>
                            <div className={'review-footer'}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <span><i className={`fas fa-thumbs-up reaction-btn ${review.userReaction === true ? 'text-warning' : ''}`}
                                                 onClick={() => handleReactionClick(review.id, true)}></i> {review.likeCount}</span>
                                        <span className={'mx-3'}><i
                                            className={`fas fa-thumbs-down reaction-btn ${review.userReaction === false ? 'text-warning' : ''}`}
                                            onClick={() => handleReactionClick(review.id, false)}></i> {review.dislikeCount}</span>
                                        {isLoggedIn ? (
                                            <span className={'review-reply-btn'}
                                                  onClick={() => handleShowReplyBox(review.id)}>Reply</span>
                                        ) : null}
                                        <span className={'mx-3 review-reply-btn'}
                                              style={{textDecoration: 'underline'}}
                                              onClick={() => handleShowReplies(review.id)}>See {review.replyCount ? review.replyCount : 0} replies <i
                                            className="fas fa-hand-point-down"></i></span>
                                    </div>
                                    <div className="col-md-4 text-right font-italic">
                                        <p>at {review.createdAt}</p>
                                    </div>
                                </div>
                                {replyParentId === review.id && (
                                    <div className={'contact-form'}>
                                        <form onSubmit={handleReviewSubmit}>
                                            <div className="row">
                                                <div className="col-md-9">
                                                                            <textarea
                                                                                className={'reply-input'}
                                                                                name="message"
                                                                                placeholder="Leave a reply..."
                                                                                style={{
                                                                                    resize: 'none',
                                                                                    overflow: 'hidden'
                                                                                }}
                                                                                onInput={(e) => autoResizeTextarea(e)}
                                                                                onChange={onChangeReview}
                                                                            ></textarea>
                                                </div>
                                                <div
                                                    className="col-md-3 d-flex justify-content-center align-items-center">
                                                    <button type={'submit'} className="btn btn-sm">Reply</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                {Array.isArray(replies) && replies.length > 0 && replies.filter(reply => reply.parentId === review.id).map((reply) => (
                                    <div key={reply.id} className={'reply-content'}>
                                        <div className={'reply-header'}>
                                            <div className="row">
                                                <div className="col-md-6 text-left"><strong>{reply.userName}</strong>
                                                </div>
                                                <div className="col-md-6 text-right font-italic">Reply
                                                    to {reply.replyTo}</div>
                                            </div>
                                        </div>
                                        <div className={'reply-body'}>
                                            <p>{reply.content}</p>
                                        </div>
                                        <div className={'reply-footer'}>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <span><i
                                                        className={`fas fa-thumbs-up reaction-btn ${reply.userReaction === true ? 'text-warning' : ''}`}
                                                        onClick={() => handleReactionClick(reply.id, true)}></i> {reply.likeCount}</span>
                                                    <span className={'mx-3'}><i
                                                        className={`fas fa-thumbs-down reaction-btn ${reply.userReaction === false ? 'text-warning' : ''}`}
                                                        onClick={() => handleReactionClick(reply.id, false)}></i> {reply.dislikeCount}</span>
                                                </div>
                                                <div
                                                    className="col-md-4 text-right font-italic">
                                                    <p>at {review.createdAt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))) : null}
            </div>
        </div>
    )
}

export default Review;
