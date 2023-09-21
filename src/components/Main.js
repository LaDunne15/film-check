import { useEffect, useState } from "react";
import Titles from "./Titles";
import { useNavigate } from "react-router-dom";
import { addTitle, clearTitles } from '../features/recentView/recentViewSlice'
import { useDispatch, useSelector } from "react-redux";

function Main() {
  const count = useSelector((state) => state.recentViews.value)
  const dispatch = useDispatch()

    
  const [data, setData] = useState(null); // To store fetched data
  const [isLoading, setIsLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const find = () => {
    navigate("/search/"+search);
  }

  useEffect(() => {
    const apiUrl = 'https://moviesdatabase.p.rapidapi.com/titles/utils/lists';

    fetch(apiUrl, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
        "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        setData(data.results); 
        setIsLoading(false); 
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>
        Пошук
      </h1>
      <form>
        <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <input type="button" onClick={find} value="Пошук"/>
      </form>

      <div>
        <span>{count}</span>
        <button
          onClick={() => dispatch(addTitle("ididid"))}
        >
        
          Decrement
        </button>
        <button onClick={() => dispatch(clearTitles())}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default Main;