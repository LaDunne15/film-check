import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import movieMini from "../../app/constants/movieMini";
import { titlesService } from "../../services/titlesService";
import searchIco from "../../static/icons/search.png";
import "./search.scss";
import BetterImage from "../title/elements/BetterImage";
import NoMoviePhoto from "../../static/icons/movieBlack.png"

function Search() {

    const [ movies, setMovies] = useState([movieMini]);
    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    const [ currentString, setCurrentString ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const { search, page } = useParams();

    const [ prevPage, setPrevPage ] = useState(0);
    const [ nextPage, setNextPage ] = useState(2);

    const [searchString, setSearchString] = useState("");

    const navigate = useNavigate();
    
    const changeCurrentData = (_string,_page) => {
        setCurrentString(_string);
        setCurrentPage(_page);
    }

    useEffect(()=>{
        changeCurrentData(search,page?page:1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        if(currentString) {
            find(currentString,currentPage);
            navigate("/search/"+currentString+"/"+currentPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage,currentString]);
  
    const searchMovie = () => {
        changeCurrentData(searchString,1);
    }

    const goPrev = () => {
        changeCurrentData(search,prevPage);
    }

    const goNext = () => {
        changeCurrentData(search,nextPage);
    }

    const find = async (_search,_page) => {
        setIsLoading(true);
        titlesService.getTitlesByName(_search,_page).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setMovies(data.results.map(i=>({
                        id: i.id,
                        name: i.originalTitleText?.text,
                        imageUrl: i.primaryImage?.url,
                        year: i.releaseYear?.year,
                        rating: i.ratingsSummary?.aggregateRating
                    })));
                    setPrevPage(Number(data.page)>1?Number(data.page-1):null);
                    setNextPage(data.next?Number(data.page)+1:null);
                    setIsLoading(false); 
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));
    }

    if(isError) {
        <div>
            Помилочка
        </div>
    }

    if(isLoading) {
        <div>
            Завантаження бютжету...
        </div>
    }

    return (
        <div className="searchBlock">
            <form className="searchInput" onSubmit={searchMovie}>
                <span>
                    Search:
                </span>
                <input type="search" value={searchString} onChange={(e)=>setSearchString(e.target.value)} />
                <button type="submit">
                    <img src={searchIco} alt="search"/>
                </button>
            </form>
            {
                movies.length>0 && 
                <div className="searchPagination">
                    <div className="prevPageBlock">
                        {
                            prevPage?
                            <button onClick={goPrev}>&#60;</button>:
                            <div> </div>
                        }
                    </div>
                    <div className="counter">
                        <span>{prevPage?prevPage:" "}</span>
                        <span className="current">{currentPage}</span>
                        <span>{nextPage?nextPage:" "}</span>
                    </div>
                    <div className="nextPageBlock">
                        {
                            nextPage?
                            <button onClick={goNext}>&#62;</button>:
                            <div> </div>
                        }
                    </div>
                </div>
            }
            {
                movies.length===0 &&
                <div>
                    Nothing
                </div>
            }
            <div className="searchResult">
                <span className="resultFor">
                    Result for <span>"{currentString}"</span>:
                </span>
                <div className="titles">
                    {
                        movies.map(i=>
                            <Link key={i.id} className="title" to={"/movie/"+i.id}>
                                <div className="background">
                                    <BetterImage className="titleImage" url={i.imageUrl} altImage={NoMoviePhoto}/>
                                </div>
                                <div className="content">
                                    <div className="_content">
                                        <span className="titleNameLink" to={"/movie/"+i.id}>{i.name}</span>  
                                        <span className="YearRating">
                                            <span className="year">{i.year?i.year:""}</span>
                                            <span className="rating">{i.rating?i.rating:""}</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
            {
                movies.length>0 && 
                <div className="searchPagination">
                    <div className="prevPageBlock">
                        {
                            prevPage?
                            <button onClick={goPrev}>&#60;</button>:
                            <div> </div>
                        }
                    </div>
                    <div className="counter">
                        <span>{prevPage?prevPage:" "}</span>
                        <span className="current">{currentPage}</span>
                        <span>{nextPage?nextPage:" "}</span>
                    </div>
                    <div className="nextPageBlock">
                        {
                            nextPage?
                            <button onClick={goNext}>&#62;</button>:
                            <div> </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Search;