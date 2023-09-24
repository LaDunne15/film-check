import { useDispatch, useSelector } from "react-redux";
import { clearTitles } from '../features/recentView/recentViewSlice';
import { useEffect, useState } from "react";
import { titlesService } from "../services/titlesService";
import movieMini from "../app/constants/movieMini";
import MovieMini from "./MovieMini";

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

    return (
        <div>
            { movies.length>0 && 
            <>
                Останні переглянуті:
                <button onClick={() => dispatch(clearTitles())}>Clear All</button>
                {
                    movies.map(i=><MovieMini movieData={i} key={i.id}/>)
                }
            </>
            }
        </div>
    )
}

export default RecentViews;