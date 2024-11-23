

//Auth

export const REGISTER_API = 'auth/user/register';
export const SIGN_IN_API = 'auth/user/login';
export const SIGN_OUT_API = 'auth/user/logout';
export const FORGOT_PASSWORD_API = 'auth/user/forgot-password';
export const RESET_PASSWORD_API = 'auth/user/reset-password';
export const CHANGE_PASSWORD_API = 'auth/user/change-password';
export const CHANGE_AVATAR_API = 'auth/user/change-avatar';
export const GET_NEW_AVATAR_API = 'auth/user/get-new-avatar';
export const GET_USER_INFO_API = 'users/user/info';

//Images
export const IMAGE_URL = 'http://localhost:8888/api/images/';
export const VIDEO_URL = 'http://localhost:8888/api/movie-files/';

//Movies
export const GET_SHOW_AT_HOME_MOVIES_API = 'movies/client/showAtHome';
export const MOVIE_DETAIL_API = 'movies/client/details/';
export const CHECK_USER_RIGHTS_API = 'movies/client/check-user-rights/';
export const GET_HOME_MOVIE_BY_CATEGORY_API = 'movies/client/home/category/';
export const MOVIE_DETAIL_RELATED_API = 'movies/client/details/related/';

export const NEW_MOVIE_CATEGORY_ID = 1;
export const TRENDING_MOVIE_CATEGORY_ID = 2;
export const COMING_SOON_MOVIE_CATEGORY_ID = 3;
export const HOT_MOVIE_CATEGORY_ID = 4;
export const ONLY_ON_MOVIEX_CATEGORY_ID = 5;
export const BEST_MOVIE_CATEGORY_ID = 6;

export const MOVIE_DETAIL = '/movie/detail/';
export const MOVIE_GENRES = '/movie/genres/';
export const MOVIE_BY_GENRE_API = '/movies/client/genre/';
export const MOVIE_BEST_MOVIES_BY_GENRE_API = '/movies/client/genre/best/';
export const SEARCH_MOVIE_API = '/movies/client/search/';
export const SEARCH_RELATED_KEYWORDS_API = '/movies/client/search/related-keys/';


//Packages
export const GET_PACKAGES_FOR_PAYMENT = 'packages/not-free';

//genres
export const GET_GENRES_API = 'genres';

//Payment
export const CREATE_VNPAY_PAYMENT = 'payment/vnpay/create-payment';
export const VNPAY_PAYMENT_IPN = 'payment/vnpay/ipn';

//Rating
export const SUBMIT_RATING_API = 'ratings/submit';



//Review
export const CREATE_REVIEW_API = 'reviews/create';
export const GET_MOVIE_REVIEWS_API = 'reviews/movie/';
export const GET_REVIEW_BY_PARENT_ID_API = 'reviews/parent/';

//reaction
export const REACTION_API = 'review-reactions/click';

//User movies
export const GET_USER_MOVIES_API = 'user-movie';

//User packages
export const GET_USER_PACKAGES_API = 'user-package';

//transaction
export const GET_USER_TRANSACTIONS_API = 'transactions/user';
