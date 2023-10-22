import { useEffect, useState } from "react";
import { titlesService } from "../../../services/titlesService";

function Countries({id}) {

    const [ counries, setCounries ] = useState([]);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        setIsLoading(true);
        titlesService.getTitleCountries(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setCounries(data.results.countriesOfOrigin.countries.map(i=>i.id));
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
        <div className="countries">
            <h6>Країни:</h6>
            {
                counries.map((i,index)=><div key={index}>{i}</div>)
            }
        </div>
    )
}

export default Countries;