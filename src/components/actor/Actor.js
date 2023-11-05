import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { titlesService } from "../../services/titlesService";
import BetterImage from "../title/elements/BetterImage";
import ActorBlack from "../../static/icons/actorBlack.png";
import NoMoviePhoto from "../../static/icons/movieBlack.png";
import movieMini from "../../app/constants/movieMini";

import "./actor.scss";

function Actor() {

    const { id } = useParams();

    const [actor, setActor] = useState({
        name: "",
        birthYear: 1970,
        deathYear: 1971,
        imageUrl: "",
        proffesions: [],
        titles: []
    });
    
    const [titles, setTitles] = useState([movieMini]);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);
    const [ imageActorUrl, setImageActorUrl ] = useState("");

    useEffect(()=>{
        document.title=actor.name;
    },[actor]);

    useEffect(()=>{
        setIsLoading(true);
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
                    setIsLoading(false);
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));
        titlesService.getTitlesPrincipalCastByIds(actor.titles.join(",")).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    const actorImg = data.results.map(i=>
                        i.principalCast[0].credits.map(j=>j.name).filter((j)=>j.id===id)
                    ).filter((i)=>i.length>0);
                    setIsLoading(false);
                    return actorImg.length?actorImg[0][0].primaryImage.url:"";
                } else {
                    setErrorData(data);
                }
            })
        ).then(
            async (img)=>{
                if(img)
                {
                    setImageActorUrl(img);
                }
                else
                {
                    await titlesService.getTitlesExtendedCastByIds(actor.titles.join(",")).then(
                    res=>res.json().then(data=>{
                        if(res.ok) {
                            const actorImg = data.results.map(i=>
                                i.cast.edges.map(j=>j.node.name).filter(j=>j.id===id)
                            ).filter((i)=>i.length>0)[0][0].primaryImage.url;
                            setImageActorUrl(actorImg);
                            setIsLoading(false);
                        } else {
                            setErrorData(data);
                        }
                    })
                    ).catch(err=>setErrorData(err))
                }
            }
        ).catch(err=>setErrorData(err));
    },[actor,id]);

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
                        titles: data.results.knownForTitles.split(",")
                    });
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
            Завантаження бютжету...
        </div>
    }

    return (
        <div className="actorBlock">
            <div className="actor">
                <BetterImage url={imageActorUrl} altImage={ActorBlack}/>
                <span className="name">{actor.name}</span>
                <span className="life">
                    <span className="birthYear">{actor.birthYear}</span>
                    { 
                        actor.deathYear && 
                        <span className="deathYear">{actor.deathYear}</span> 
                    }
                </span>
                <div className="proffesions">
                    {
                        actor.proffesions.map(i=>
                            <span key={i} className="proffesion">
                                {i}
                            </span>
                        )
                    }
                </div>
            </div>
            <div className="titles">
                {
                    titles.map(i=>
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

export default Actor;