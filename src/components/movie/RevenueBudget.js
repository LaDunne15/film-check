import { useEffect, useState } from "react";
import budget from "../../app/constants/revenueBudget";
import { titlesService } from "../../services/titlesService.js";

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
        <div className="budget">
            <h4>Бютжет</h4>
            <div>
                { revenueBudget.production.amount && <p>Кошторис: {revenueBudget.production.amount} {revenueBudget.production.currency}</p> }
                { revenueBudget.weekend.amount && <p>Збір за перший вихідний: {revenueBudget.weekend.amount} {revenueBudget.weekend.currency} {revenueBudget.weekend.endDate}</p>}
                { revenueBudget.worldwide.amount && <p>Світовий збір: {revenueBudget.worldwide.amount} {revenueBudget.worldwide.currency}</p>}
                { revenueBudget.lifetime.amount && <p>Збір США і Канада: {revenueBudget.lifetime.amount} {revenueBudget.lifetime.currency}</p>}
            </div>
        </div>
    )
}

export default RevenueBudget;