import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function MovieMini({movieData}) {

    const [movie,setMovie] =useState({
        id:"",
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
            <Link to={"/movie/"+movie.id} >До фільму</Link>
        </div>
    )
}

export default MovieMini;