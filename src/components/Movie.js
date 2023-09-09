import { useEffect, useState } from "react";
import "./style.css";

function Movie({movieData}) {

    const [movie,setMovie] =useState({
        titleText:{
            text:""
        },
        primaryImage:{
            url:""
        }
    });
    useEffect(()=>{
        setMovie(movieData);
    },[movieData]);

    return (
        <div>
            {movie.titleText.text}
            {movie.primaryImage?<img className="image" src={movie.primaryImage.url} alt="Фото не завантажилось"/>:"Без фото"}
        </div>
    )
}

export default Movie;