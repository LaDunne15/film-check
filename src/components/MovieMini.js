import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import movieMini from "../app/constants/movieMini";

import NoMoviePhoto from "../static/images/MovieNoPhoto.jpg";

function MovieMini({movieData}) {

    const [movie,setMovie] =useState(movieMini);

    useEffect(()=>{
        setMovie(movieData);
    },[movieData]);

    return (
        <Card>
            {
                movie.imageUrl?<Card.Img style={{ width: '18rem' }} src={movie.imageUrl}/>:
                <Card.Img style={{ width: '18rem' }} src={NoMoviePhoto}/>
            }
            <Card.Body>
                <Card.Title>
                    <Link to={"/movie/"+movie.id}>{movie.name}</Link>  
                </Card.Title>
                <Card.Subtitle>{movie.year} ⭐{movie.rating}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default MovieMini;