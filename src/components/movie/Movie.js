import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { titlesService } from "../../services/titlesService.js";
import { formatService } from "../../services/formatService.js";
import { encode } from 'base-64';
import { addTitle, clearTitles } from '../../features/recentView/recentViewSlice.js'
import { useDispatch, useSelector } from "react-redux";

function Movie() {

    const {id} =useParams();

    const count = useSelector((state) => state.recentViews.value);
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

    const [ extendedCast, setExtendedCast] = useState([{
        id: "",
        name: "",
        imageUrl: "",
        characters: [{
            name:""
        }]
    }]);

    const [ principalCast, setPrincipalCast ] = useState([{
        id: "",
        name: "",
        imageUrl: "",
        characters: [{
            name:""
        }]
    }]);

    const [ summaries, setSummaries ] = useState("");

    const [ revenueBudget, setRevenueBudget ] = useState({
        production: {
            amount:0,
            currency:""
        },
        lifetime: {
            amount:0,
            currency:""
        },
        weekend: {
            endDate: "",
            amount:0,
            currency:""
        },
        worldwide: {
            amount:0,
            currency:""
        }
    });
    
    const [ moreLikeThis, setMoreLikeThis ] = useState([{
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
        setIsError(true);
    },[errorData])

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
                    console.log(data);
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
                    setPrincipalCast(
                        data.results.principalCast?data.results.principalCast[0]?.credits.map(i=>({
                            id: i.name.id,
                            name: i.name.nameText.text,
                            imageUrl: i.name.primaryImage?.url,
                            characters: i.characters?.map(j=>j.name)
                        })):null
                    )
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
        ).catch(err=>setErrorData(err));

        titlesService.getTitleExtendedCast(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setExtendedCast(
                        data.results.cast.edges.map(i=>({
                            id:i.node.name.id,
                            name:i.node.name.nameText.text,
                            imageUrl:i.node.name.primaryImage?.url,
                            characters: i.node.characters.map(j=>j.name)
                        }))
                    );
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

        titlesService.getTitlRevenueBudget(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setRevenueBudget({
                        production: {
                            amount: data.results.productionBudget?.budget.amount,
                            currency: data.results.productionBudget?.budget.currency
                        },
                        lifetime: {
                            amount: data.results.lifetimeGross?.total.amount,
                            currency: data.results.lifetimeGross?.total.currency
                        },
                        weekend: {
                            amount: data.results.openingWeekendGross?.gross.total.amount,
                            currency: data.results.openingWeekendGross?.gross.total.currency,
                            endDate: data.results.openingWeekendGross?.weekendEndDate
                        },
                        worldwide: {
                            amount: data.results.worldwideGross?.total.amount,
                            currency: data.results.worldwideGross?.total.currency
                        }
                    })
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));

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
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));

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
            <div className="summaries">
                <h5>{summaries}</h5>
            </div>
            <div className="countries">
                <h6>Країни:</h6>
                {
                    counries.map((i,index)=><div key={index}>{i}</div>)
                }
            </div>
            <div className="images">
                {
                    images.map((i,index)=><img style={{width:"100px"}} key={index} src={i.url} alt={i.plainText}/>)
                }
            </div>
            В ролях:
            <div className="cast">
                {
                    principalCast && principalCast.map(i=>
                        <div key={i.id}>
                            <img style={{width:"100px"}} src={i.imageUrl} alt={i.name}/>
                            <Link to={"/actor/"+i.id+"/"+(encode(i.imageUrl))}> {i.name} </Link>
                            <span> {i.characters?.join(" ")} </span>
                        </div>
                    )
                }
                {
                    extendedCast.map(i=>
                        <div key={i.id}>
                            <img style={{width:"100px"}} src={i.imageUrl} alt={i.name}/>
                            <Link to={"/actor/"+i.id+"/"+(encode(i.imageUrl))}> {i.name} </Link>
                            <span> {i.characters?.join(" ")} </span>
                        </div>
                    )
                }
            </div>
            <div className="awards">
                <p>
                    <span>
                        { awards.prestigeAward.name && <span>Престижна нагорода {awards.prestigeAward.name}:</span> }
                        { awards.prestigeAward.win>0 && <span> {awards.prestigeAward.wins} виграшів </span> }
                        { awards.prestigeAward.nominations>0 && <span> {awards.prestigeAward.nominations} номінацій </span> }
                    </span>
                    { awards.wins>0 && <span> Виграшів: {awards.wins}</span> }
                    { awards.nominations>0 && <span> Номінацій: {awards.nominations} </span> }
                    { awards.nominations>0 && awards.wins>0 && <span>загалом</span> }
                </p>
            </div>
            <div className="budget">
                <h4>Бютжет</h4>
                <div>
                    { revenueBudget.production.amount && <p>Кошторис: {revenueBudget.production.amount} {revenueBudget.production.currency}</p> }
                    { revenueBudget.weekend.amount && <p>Збір за перший вихідний: {revenueBudget.weekend.amount} {revenueBudget.weekend.currency} {revenueBudget.weekend.endDate}</p>}
                    { revenueBudget.worldwide.amount && <p>Світовий збір: {revenueBudget.worldwide.amount} {revenueBudget.worldwide.currency}</p>}
                    { revenueBudget.lifetime.amount && <p>Збір США і Канада: {revenueBudget.lifetime.amount} {revenueBudget.lifetime.currency}</p>}
                </div>
            </div>
            <div className="moreLikeThis">
                {
                    moreLikeThis.map(i=>
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

export default Movie;