import { useEffect, useState } from "react";
import _title from "../../../app/constants/mainInfo";
import { titlesService } from "../../../services/titlesService.js";
import { formatService } from "../../../services/formatService.js";
import ReactPlayer from "react-player";

import increaseIcon from "../../../static/icons/increase.png";
import altImage from "../../../static/icons/movieBlack.png";
import decreaseIcon from "../../../static/icons/decrease.png";
import BetterImage from "./BetterImage.js";

function MainInfo({id}) {
    
    document.addEventListener('touchstart',{passive:true});

    const [ title, setTitle ] = useState(_title);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        setIsLoading(true);
        titlesService.getTitleCustomInfo(id).then((res)=>{
            res.json().then(data=>{
                if(res.ok) {
                    setTitle({
                        name: data.results.titleText.text,
                        imageUrl: data.results.primaryImage?.url,
                        year: data.results.releaseYear?.year,
                        runtime:  formatService.secondsToHoursAndMinutes(data.results.runtime?.seconds),
                        genres: data.results.genres.genres.map(i=>i.text),
                        keywords: data.results.keywords.edges.map(i=>i.node.text),
                        type: data.results.titleType.text,
                        episodes: data.results.titleType.isSeries? {
                            total: data.results.episodes.totalEpisodes.total,
                            seasons: data.results.episodes.seasons.length
                        } : { total:0, seasons:0 },
                        rating: {
                            avgRating: data.results.ratingsSummary.aggregateRating,
                            voteCount: formatService.formatNumber(data.results.ratingsSummary.voteCount),
                            popularity: {
                                current: data.results.meterRanking?.currentRank,
                                changeDirection: data.results.meterRanking?.rankChange.changeDirection,
                                difference: data.results.meterRanking?.rankChange.difference
                            }
                        },
                        plot: data.results.plot?.plotText.plainText,
                        writers: data.results.writers[0]?.credits.map(i=> ({
                            id:i.name.id,
                            name:i.name.nameText.text
                        })),
                        directors: data.results.directors[0]?.credits.map(i=> ({
                            id:i.name.id,
                            name:i.name.nameText.text
                        })),
                        creators: data.results.creators[0]?.credits.map(i=> ({
                            id:i.name.id,
                            name:i.name.nameText.text
                        })),
                        stars: data.results.principalCast?data.results.principalCast[0]?.credits.map(i=>({
                            id: i.name.id,
                            name: i.name.nameText.text
                        })):null,
                        trailerUrl: data.results.trailer
                    });
                    setIsLoading(false);
                } else {
                    setErrorData(data);
                }
            })
        }).catch(err=>setErrorData(err));
    },[id]);

    useEffect(()=>{
        document.title=title.name;
    },[title]);

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
        <div className="main-info">
            <div className="poster">
                <div className="titleImage">
                    <BetterImage url={title.imageUrl} altImage={altImage}/>
                </div>
                <div className="title-info">
                    <span className="titleName">{title.name} • {title.year}</span>
                    <span><span className="titleType">{title.type}</span> {title.episodes.total?` • ${title.episodes.seasons}s ${title.episodes.total}ep`:""} {title.runtime?` • ${title.runtime}`:""}</span>                    
                    { title.rating.avgRating&&<span>⭐{title.rating.avgRating}/10 • {title.rating.voteCount} votes</span>}
                    {
                        title.rating.popularity.current && 
                        <div className="popularity">
                            <span>iMDB top :</span>
                            <span>{title.rating.popularity.current}</span>
                            <div className={`difference ${title.rating.popularity.changeDirection==="DOWN"?"down":"up"}`}>
                                <img src={title.rating.popularity.changeDirection==="DOWN"?decreaseIcon:increaseIcon} alt="popularity"/>
                                <span>{title.rating.popularity.difference}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="titleGenres">{title.genres.map(i=><span key={i}>{i}</span>)}</div>
            <span className="titlePlot">{title.plot}</span>
            <div className="titleKeywords">{title.keywords.map(i=><span key={i}>{i}</span>)}</div>
            { title.directors&&
                <div className="executers_part">
                    <span>Directors</span>
                    <div className="executers">
                        {title.directors.map(i=>
                            <span key={i.id} className="executer">
                                {i.name}
                            </span>
                        )}
                    </div>
                </div>
            }
            { title.writers&&
                <div className="executers_part">
                    <span>Writers</span>
                    <div className="executers">
                        {title.writers.map(i=>
                            <span key={i.id} className="executer">
                                {i.name}
                            </span>
                        )}
                    </div>
                </div>
            }
            { title.creators&&
                <div className="executers_part">
                    <span>Creators</span>
                    <div className="executers">
                        {title.creators.map(i=>
                            <span key={i.id} className="executer">
                                {i.name}
                            </span>
                        )}
                    </div>
                </div>
            }
            { title.stars&&
                <div className="executers_part">
                    <span>Stars</span>
                    <div className="executers">
                        {title.stars.map(i=>
                            <span key={i.id} className="executer">
                                {i.name}
                            </span>
                        )}
                    </div>
                </div>
            }
            { false && title.trailerUrl&&
                <div className="titleTrailer"><ReactPlayer width="100%" height="100%" url={title.trailerUrl} /></div>
            }
        </div>
    );
}

export default MainInfo;