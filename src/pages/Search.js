import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";


const Search = () => {
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

    return (
        <div>
            <h1 style={{color: 'black'}}>{keyword}</h1>
        </div>
    )
}

export default Search;
