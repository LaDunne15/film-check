import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { titlesService } from "../services/titlesService";
import { decode } from 'base-64';

function Actor() {

    const { id, imageUrl } = useParams();

    const [actor, setActor] = useState({
        name: "",
        birthYear: 1970,
        deathYear: 1971,
        imageUrl: "",
        proffesions: [],
        titles: []
    });

    

    const [titles, setTitles] = useState([{
        id: "",
        name: "",
        imageUrl: "",
        year: 0,
        rating: 0
    }]);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        titlesService.getTitlesByIds(actor.titles.join(",")).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setTitles(
                        data.results.map(i=>({
                            id: i.id,
                            name: i.titleText?.text,
                            imageUrl: i.primaryImage?.url,
                            year: i.releaseYear?.year,
                            rating: i.ratingsSummary?.aggregateRating
                        }))
                    );
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));
    },[actor]);

    useEffect(()=>{
        setIsError(true);
    },[errorData])

    useEffect(()=>{
        titlesService.getActorById(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setActor({
                        name: data.results.primaryName,
                        birthYear: data.results.birthYear,
                        deathYear: data.results.deathYear!=='\\N'?data.results.deathYear:null,
                        proffesions: data.results.primaryProfession.split(","),
                        titles: data.results.knownForTitles.split(","),
                        imageUrl: decode(imageUrl)
                    });
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));
    },[id, imageUrl]);

    return (
        <div>
            <div className="actor">
                <img style={{width:"100px"}} src={actor.imageUrl} alt={actor.name} />
                <h3>{actor.name}</h3>
                <h5>{actor.birthYear}{ actor.deathYear && <>{actor.deathYear}</> }</h5>
                {
                    actor.proffesions.map(i=>
                        <div key={i}>
                            {i}
                        </div>
                    )
                }
            </div>
            <div className="titles">
                {
                    titles.map(i=>
                        <div key={i.id}>
                            <Link to={"/movie/"+i.id} >{i.name}</Link>
                            <span>{i.year}</span>
                            <span>{i.rating}</span>
                            <img style={{width:"100px"}} src={i.imageUrl} alt={i.name}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Actor;