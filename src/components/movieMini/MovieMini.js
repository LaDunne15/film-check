import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import movieMini from "../../app/constants/movieMini";

import NoMoviePhoto from "../../static/images/MovieNoPhoto.jpg";
import "./movieMini.scss";

function MovieMini({movieData}) {

    const [movie,setMovie] =useState(movieMini);

    useEffect(()=>{
        setMovie(movieData);
    },[movieData]);

    return (
        <Card className="mini-movie">
            {
                movie.imageUrl?<Card.Img className="image" src={movie.imageUrl}/>:
                <Card.Img className="image" src={NoMoviePhoto}/>
            }
            <Card.Body className="content">
                <Card.Title className="movie-name">
                    <Link className="movie-name-link" to={"/movie/"+movie.id}>{movie.name}</Link>  
                </Card.Title>
                <Card.Subtitle className="movie-year-rating">
                    { movie.rating?<Card.Text>{movie.year}</Card.Text>:<Card.Text>{new Date().getFullYear()}</Card.Text>}
                    { movie.rating&&<Card.Text>⭐{movie.rating}</Card.Text>}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default MovieMini;