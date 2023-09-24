import { useEffect, useState } from "react";
import { titlesService } from "../../services/titlesService";
import MovieMini from "../MovieMini";
import movieMini from "../../app/constants/movieMini";


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
        <div className="moreLikeThis">
        {
            moreLikeThis.map(i=><MovieMini movieData={i} key={i.id}/>)
        }
        </div>
    )
}

export default MoreLikeThis;