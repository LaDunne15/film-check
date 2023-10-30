import { useEffect, useState } from "react";
import { titlesService } from "../../../services/titlesService";
import _awards from "../../../app/constants/awards";

function Awards({id}) {

    
    const [ awards, setAwards ] = useState(_awards);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        setIsLoading(true);
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
            Завантаження бютжету...
        </div>
    }

    return (
        <div className="awardsBlock">
            <span>Awards</span>
            <div className="awards">
            {
                awards.prestigeAward.name &&
                <div className="prestigeAwards">
                    <span>{awards.prestigeAward.name}: </span>
                    <div className="total">
                        {   
                            awards.prestigeAward.wins>0 &&
                            <div className="wins">
                                <span>{awards.prestigeAward.wins}</span>
                                <span>wins</span>
                            </div>
                        }
                        {   
                            awards.prestigeAward.nominations>0 &&
                            <div className="nominations">
                                <span>{awards.prestigeAward.nominations}</span>
                                <span>nominations</span>
                            </div>
                        }
                    </div>
                </div>
            }
                <div className="otherAwards">
                    { awards.prestigeAward.name && <span>Other: </span>}
                    <div className="total">
                        {   
                            awards.wins>0 &&
                            <div className="wins">
                                <span>{awards.wins}</span>
                                <span>wins</span>
                            </div>
                        }
                        {   
                            awards.nominations>0 &&
                            <div className="nominations">
                                <span>{awards.nominations}</span>
                                <span>nominations</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Awards;