import { useEffect, useState } from "react";
import Movie from "./Movie";
import { useNavigate, useParams } from "react-router-dom";

function Search() {

    const [ movies, setMovies] = useState([]);
    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ error, setError] = useState(false); // To track any errors

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
        setError(false);
        setIsLoading(true);
        const apiUrl = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/'+_search+"?page="+_page;
        await fetch(apiUrl, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setMovies(data.results);
            setPrevPage(Number(data.page)>1?Number(data.page-1):null);
            setNextPage(data.next?Number(data.page)+1:null);
            setIsLoading(false); 
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
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
                (!error) && (!isLoading) && movies.map((i,index)=>
                    <Movie key={index} movieData={i}/>
                )
            }
        </div>
    )
}

export default Search;