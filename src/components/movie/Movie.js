import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addTitle } from '../../features/recentView/recentViewSlice.js'
import { useDispatch } from "react-redux";

import RevenueBudget from "./RevenueBudget.js";
import MoreLikeThis from "./MoreLikeThis.js";
import Awards from "./Awards.js";
import Cast from "./Cast.js";
import Images from "./Images.js";
import Countries from "./Countries.js";
import Summary from "./Summary.js";
import MainInfo from "./MainInfo.js";

function Movie() {

    const {id} =useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(addTitle(id));
    },[id, dispatch]);

    return (
        <div>
            <MainInfo id={id}/>
            <Summary id={id}/>
            <Countries id={id}/>
            <Images id={id}/>
            <Cast id={id}/>
            <Awards id={id}/>
            <RevenueBudget id={id}/>
            <MoreLikeThis id={id}/>
        </div>
    )
}
export default Movie;