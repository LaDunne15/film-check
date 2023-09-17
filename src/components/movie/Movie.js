import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { titlesService } from "../../services/titlesService.js";
import { formatService } from "../../services/formatService.js";
import CustomInfo from "./CustomInfo.js";

function Movie() {

    const {id} =useParams();

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

    const [ awards, setAwards ] = useState({
        wins: 0,
        nominations: 0,
        prestigeAward: {
            name: "",
            wins: 0,
            nominations: 0
        }
    });

    const [ images, setImages ] = useState([{
        url:"",
        plainText:""
    }]);

    const [ revenueBudget, setRevenueBudget ] = useState([]);
    const [ extendedCast, setExtendedCast] = useState([]);
    
    const [ moreLikeThis, setMoreLikeThis ] = useState([]);
    const [ summaries, setSummaries ] = useState([]);
    const [ synopses, setSynopses ] = useState([]);
    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData])

    useEffect(()=>{
        setIsLoading(true);
        setIsError(false);
        titlesService.getTitleCustomInfo(id).then((res)=>{
            res.json().then(data=>{
                if(res.ok) {
                    setTitle({
                        name: data.results.titleText.text,
                        imageUrl: data.results.primaryImage.url,
                        year: data.results.releaseYear.year,
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

        titlesService.getTitleAwards(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setAwards({
                        nominations: data.results.nominations?.total,
                        wins: data.results.wins?.total,
                        prestigeAward: {
                            name: data.results.prestigiousAwardSummary?.award?.text,
                            wins: data.results.prestigiousAwardSummary?.wins,
                            nominations: data.results.prestigiousAwardSummary?.nominations
                        }
                    });
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));

        titlesService.getTitleImages(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setImages(
                        data.results.titleMainImages.edges.map(i=>({
                            url: i.node.url,
                            plainText: i.node.caption.plainText
                        }))
                    );
                } else {
                    setErrorData(data);
                }
            })
        )

        const apiUrl5 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=extendedCast";
        fetch(apiUrl5, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                //setErrDatasetErrorDataor(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setExtendedCast(data);
        })
        .catch((error) => {
            //setError(error);
            setIsLoading(false);
        });

        const apiUrl4 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=revenue_budget";
        fetch(apiUrl4, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setErrorData(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setRevenueBudget(data);
        })
        .catch((error) => {
            ////setError(error);
            setIsLoading(false);
        });
        
        
        const apiUrl8 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=moreLikeThisTitles";
        fetch(apiUrl8, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                //setErrDatasetErrorDataor(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setMoreLikeThis(data);
        })
        .catch((error) => {
            //setError(error);
            setIsLoading(false);
        });
        const apiUrl9 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=summaries";
        fetch(apiUrl9, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                //setErrDatasetErrorDataor(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setSummaries(data);
        })
        .catch((error) => {
            //setError(error);
            setIsLoading(false);
        });
        
        const apiUrl12 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=synopses";
        fetch(apiUrl12, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                //setErrDatasetErrorDataor(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setSynopses(data);
        })
        .catch((error) => {
            //setError(error);
            setIsLoading(false);
        });
    },[id]);

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
            <div className="awards">
                <p>
                    <span>
                        { awards.prestigeAward.name && <span>Престижна нагорода {awards.prestigeAward.name}:</span> }
                        { awards.prestigeAward.wins && <span> {awards.prestigeAward.wins} виграшів </span> }
                        { awards.prestigeAward.nominations && <span> {awards.prestigeAward.nominations} номінацій </span> }
                    </span>
                    { awards.wins>0 && <span> Виграшів: {awards.wins}</span> }
                    { awards.nominations>0 && <span> Номінацій: {awards.nominations} </span> }
                    { awards.nominations>0 && awards.wins>0 && <span>загалом</span> }
                </p>
            </div>
            <div className="images">
                {
                    images.map((i,index)=><img style={{width:"100px"}} key={index} src={i.url} alt={i.plainText}/>)
                }
            </div>
            <pre>
            Озвучки:
            {
                JSON.stringify(extendedCast,null,2)
            }
            Бютжет:
            {
                JSON.stringify(revenueBudget,null,2)
            }
            Схожі:
            {
                JSON.stringify(moreLikeThis,null,2)
            }
            Підсумок:
            {
                JSON.stringify(summaries,null,2)
            }
            Синопсис:
            {
                JSON.stringify(synopses,null,2)
            }
            </pre>
        </div>
    )
}

export default Movie;