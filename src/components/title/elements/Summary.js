import { useEffect, useState } from "react";
import { titlesService } from "../../../services/titlesService";

function Summary({id}) {

    const [ summaries, setSummaries ] = useState("");

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        setIsLoading(true);
        titlesService.getTitlSummaries(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setSummaries(data.results.summaries.edges[0].node.plotText.plaidHtml);
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
        <div className="summaries">
            <h5>{summaries}</h5>
        </div>
    )
}

export default Summary;