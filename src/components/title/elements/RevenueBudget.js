import { useEffect, useState } from "react";
import budget from "../../../app/constants/revenueBudget";
import { titlesService } from "../../../services/titlesService.js";
import { formatService } from "../../../services/formatService";

function RevenueBudget({id}) {
    
    const [ revenueBudget, setRevenueBudget ] = useState(budget);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);


    useEffect(()=>{
        setIsLoading(true);
        setIsError(false);
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
        <div className="budgetBlock">
            <span>Box Office</span>
            <div className="boxOffice">
                {
                    revenueBudget.production.amount &&
                    <div className="budget">
                        <span>Budget</span>
                        <div>{formatService.formatNumber(revenueBudget.production.amount)} {revenueBudget.production.currency}</div>
                    </div>
                }
                { 
                    revenueBudget.weekend.amount && 
                    <div className="weekend">
                        <span>Opening weekend US & Canada <span className="date">{formatService.formatDate(revenueBudget.weekend.endDate)}</span></span>
                        <div>{formatService.formatNumber(revenueBudget.weekend.amount)} {revenueBudget.weekend.currency}</div>
                    </div>
                }
                { 
                    revenueBudget.worldwide.amount &&
                    <div className="worldwide">
                        <span>Gross worldwide</span>
                        <div>{formatService.formatNumber(revenueBudget.worldwide.amount)} {revenueBudget.worldwide.currency}</div>
                    </div>
                }
                { 
                    revenueBudget.lifetime.amount && 
                    <div className="lifetime">
                        <span>Gross US & Canada</span>
                        <div>{formatService.formatNumber(revenueBudget.lifetime.amount)} {revenueBudget.lifetime.currency}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default RevenueBudget;