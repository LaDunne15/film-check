import { useDispatch, useSelector } from "react-redux";
import { clearTitles } from '../../features/recentView/recentViewSlice';
import { useEffect, useState } from "react";
import { titlesService } from "../../services/titlesService";
import movieMini from "../../app/constants/movieMini";
import NoMoviePhoto from "../../static/icons/movieYellow.png";

import "./recentViews.scss";
import { Link } from "react-router-dom";

function RecentViews() {

    const moviesId = useSelector((state) => state.recentViews.value);
    const dispatch = useDispatch();
    const [ movies, setMovies ] = useState([movieMini]);

    useEffect(()=>{
        titlesService.getTitlesByIds(moviesId.join(",")).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setMovies(
                        data.results?data.results.map(i=>({
                            id: i.id,
                            name: i.originalTitleText?.text,
                            imageUrl: i.primaryImage?.url,
                            year: i.releaseYear?.year,
                            rating: i.ratingsSummary?.aggregateRating
                        })):[]
                    );
                } else {

                }
            })
        )
    },[moviesId]);

    if(!movies.length) {
        return (
            <></>
        )
    }

    return (
        <div className="recentViews">
            <div className="titleBlock">
                <span>Recent views</span>
                <button onClick={() => dispatch(clearTitles())}>Clear All</button>
            </div>
            
            <div className="movies">
            {
                movies.map(i=>
                    <div className="movie" key={i.id}>
                        {
                            i.imageUrl?<img src={i.imageUrl} alt={i.name}/>:<img src={NoMoviePhoto} alt={i.name}/>
                        }
                        <Link className="nameLink" to={"/movie/"+i.id}>{i.name}</Link> 
                        { i.rating?<span className="rating">{i.rating}</span>:<span className="no-rating">-</span> }
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default RecentViews;