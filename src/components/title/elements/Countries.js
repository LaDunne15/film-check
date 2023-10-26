import { useEffect, useState } from "react";
import { titlesService } from "../../../services/titlesService";

let data = require("../../../static/countries.json");

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

    function getCountyName(countryCode) {
        return data.filter( function (data) {
            return data.code === countryCode;
        })[0]?.name;
    }

    return (
        <div className="countries">
            <span>Countries</span>
            <div className="countriesList">
            {
                counries.map((i,index)=><span key={index} className="country">{getCountyName(i)}</span>)
            }
            </div>
        </div>
    )
}

export default Countries;