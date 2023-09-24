import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieMini from "./MovieMini";
import movieMini from "../app/constants/movieMini";
import { titlesService } from "../services/titlesService";

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
        <div>
            <input type="search" value={searchString} onChange={(e)=>setSearchString(e.target.value)} />
            <input type="button" onClick={searchMovie} value="Пошук"/>
            {
                <div>
                    { prevPage?<p>Попередня сторінка: {prevPage}<button onClick={goPrev}>До попередньої</button></p>:<></> }
                      <p>Поточна сторінка: {currentPage}</p>
                    { nextPage?<p>Наступна сторінка: {nextPage}<button onClick={goNext}>До наступної</button></p>:<></>
                    }
                </div>
            }
            {
                movies.map(i=><MovieMini key={i.id} movieData={i}/>)
            }
        </div>
    )
}

export default Search;