import { useEffect, useState } from "react";
import { titlesService } from "../../services/titlesService";
import _awards from "../../app/constants/awards";

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
    )
}

export default Awards;