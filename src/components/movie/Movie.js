import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { titlesService } from "../../services/titlesService.js";
import { formatService } from "../../services/formatService.js";
import { addTitle } from '../../features/recentView/recentViewSlice.js'
import { useDispatch } from "react-redux";

import RevenueBudget from "./RevenueBudget.js";
import MoreLikeThis from "./MoreLikeThis.js";
import Awards from "./Awards.js";
import Cast from "./Cast.js";
import Images from "./Images.js";

function Movie() {

    const {id} =useParams();
    const dispatch = useDispatch();

    const [ title, setTitle ] = useState({
        name: "",
        imageUrl: "",
        year: 1970,
        genres: [],
        keywords: [],
        type: "",
        episodes: {
            total: 0,
            seasons: 0
        },
        rating: {
            avgRating: 0,
            voteCount: "",
            popularity: {
                current: 0,
                changeDirection: "",
                difference: 0
            }
        },
        plot: "",
        writers: [{ id:"", name:"" }],
        directors: [{ id:"", name:"" }],
        creators: [{ id:"", name:"" }],
        stars: [{ id:"", name:"" }],
        runtime: "",
        trailerUrl: ""
    });

    const [ counries, setCounries ] = useState([]);


    const [ summaries, setSummaries ] = useState("");
    

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        document.title=title.name;
    },[title]);

    useEffect(()=>{
        setIsLoading(true);
        setIsError(false);
        dispatch(addTitle(id));
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
                } else {
                    setErrorData(data);
                }
            })
        }).catch(err=>setErrorData(err));

        titlesService.getTitleCountries(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setCounries(
                        data.results.countriesOfOrigin.countries.map(i=>i.text)
                    )
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));

        titlesService.getTitlSummaries(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setSummaries(data.results.summaries.edges[0].node.plotText.plaidHtml);
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));

    },[id, dispatch]);

    return (
        <div>
            <div className="custom_info">
                <h4>{title.name} ({title.year}) - {title.runtime}</h4>
                <h5>{title.type}</h5>
                <div>{title.episodes.total>0 && <h5>Сезонів: {title.episodes.seasons} Всього серій: {title.episodes.total}</h5>}</div>
                <img style={{width:"100px"}} src={title.imageUrl} alt={title.name}/>
                <div style={{display:"inline-block"}}>{title.genres.map((i,index)=><div key={index}>{i}</div>)}</div>
                <h5>{title.plot}</h5>
                <div style={{display:"inline-block"}}>{title.keywords.map((i,index)=><div key={index}>{i}</div>)}</div>
                <div>
                    <p>Рейтинг: {title.rating.avgRating}/10. Проголосували разів: {title.rating.voteCount}</p>
                    { title.rating.popularity.current && <p>Популярність: {title.rating.popularity.current}, {title.rating.popularity.changeDirection="DOWN"?"впав на":"піднявся на"} {title.rating.popularity.difference}</p>}
                </div>

                { title.directors&&<h6>Режисер: {JSON.stringify(title.directors,null,2)}</h6>}
                { title.writers&&<h6>Сценаристи: {JSON.stringify(title.writers,null,2)}</h6>}
                { title.creators&&<h6>Творці: {JSON.stringify(title.creators,null,2)}</h6>}
                { title.stars&&<h6>Зірки: {JSON.stringify(title.stars,null,2)}</h6>}
                { title.trailerUrl&&<iframe title={title.name} style={{width:"100%"}} src={title.trailerUrl} allow="fullscreen"></iframe> }
            </div>
            <div className="summaries">
                <h5>{summaries}</h5>
            </div>
            <div className="countries">
                <h6>Країни:</h6>
                {
                    counries.map((i,index)=><div key={index}>{i}</div>)
                }
            </div>
            <Images id={id}/>
            <Cast id={id}/>
            <Awards id={id}/>
            <RevenueBudget id={id}/>
            <MoreLikeThis id={id}/>
        </div>
    )
}
export default Movie;