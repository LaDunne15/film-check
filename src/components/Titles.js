import { useEffect, useState } from "react";
import Movie from "./Movie";

function Titles({titles}) {
    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track any errors

    useEffect(()=>{
        const apiUrl = "https://moviesdatabase.p.rapidapi.com/titles?list="+titles;
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
    },[titles]);

    
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return (
        <div>
            <h4>{titles}</h4>
            {
                data.map((i,index)=>
                    <Movie key={index} movieData={i}/>
                )
            }
        </div>
    )
}

export default Titles;