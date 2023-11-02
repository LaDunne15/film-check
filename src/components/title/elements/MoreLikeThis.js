import { useEffect, useState } from "react";
import { titlesService } from "../../../services/titlesService";
import movieMini from "../../../app/constants/movieMini";
import BetterImage from "./BetterImage";
import NoMoviePhoto from "../../../static/icons/movieBlack.png";
import { Link } from "react-router-dom";


function MoreLikeThis ({id}){
    
    const [ moreLikeThis, setMoreLikeThis ] = useState([movieMini]);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{

        
        setIsLoading(true);
        setIsError(false);
        titlesService.getTitleMoreLikeThis(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setMoreLikeThis(
                        data.results.moreLikeThisTitles.edges.map(i=>({
                            id: i.node.id,
                            name: i.node.originalTitleText?.text,
                            imageUrl: i.node.primaryImage?.url,
                            year: i.node.releaseYear?.year,
                            rating: i.node.ratingsSummary?.aggregateRating
                        }))
                    );
                    setIsLoading(false);
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));
    },[id]);

    if(isError) {
        <div>
            Помилочка
        </div>
    }

    if(isLoading) {
        <div>
            Завантаження схожих...
        </div>
    }

    return (
        <div className="moreLikeThisBlock">
            <span>More like this</span>
            <div className="titles">
                {
                    moreLikeThis.map(i=>
                        <Link key={i.id} className="title" to={"/movie/"+i.id}>
                            <div className="background">
                                <BetterImage className="titleImage" url={i.imageUrl} altImage={NoMoviePhoto}/>
                            </div>
                            <div className="content">
                                <div className="_content">
                                    <span className="titleNameLink" to={"/movie/"+i.id}>{i.name}</span>  
                                    <span className="YearRating">
                                        <span className="year">{i.year?i.year:""}</span>
                                        <span className="rating">{i.rating?i.rating:""}</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default MoreLikeThis;