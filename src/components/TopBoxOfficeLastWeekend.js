import { useEffect, useState } from "react";
import { titlesService } from "../services/titlesService";
import movieMini from "../app/constants/movieMini";
import MovieMini from "./MovieMini";

function TopBoxOfficeLastWeekend() {

    const [ movies, setMovies ] = useState([movieMini]);

    useEffect(()=>{
        titlesService.getTopBoxOfficeLastWeekend().then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setMovies(
                        data.results.map(i=>({
                            id: i.id,
                            name: i.originalTitleText?.text,
                            imageUrl: i.primaryImage?.url,
                            year: i.releaseYear?.year,
                            rating: i.ratingsSummary?.aggregateRating
                        }))
                    );
                } else {

                }
            })
        )
    },[]);

    return (
        <div>
            Останній касовий збір:
            {
                movies.map(i=><MovieMini movieData={i} key={i.id}/>)
            }
        </div>
    )
}

export default TopBoxOfficeLastWeekend;