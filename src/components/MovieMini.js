import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import movieMini from "../app/constants/movieMini";

function MovieMini({movieData}) {

    const [movie,setMovie] =useState(movieMini);

    useEffect(()=>{
        setMovie(movieData);
    },[movieData]);

    return (
        <div>            
            <Link to={"/movie/"+movie.id}>{movie.name}</Link>            
            {   
                movie.imageUrl? <img className="image" src={movie.imageUrl} loading="lazy" alt="Фото не завантажилось"/>:"Без фото"
            }
            <h6>{ movie.year }</h6>
            <h6>{ movie.rating }</h6>
        </div>
    )
}

export default MovieMini;