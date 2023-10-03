import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addTitle } from '../features/recentView/recentViewSlice.js'
import { useDispatch } from "react-redux";

import RevenueBudget from "../components/movie/RevenueBudget.js";
import MoreLikeThis from "../components/movie/MoreLikeThis.js";
import Awards from "../components/movie/Awards.js";
import Cast from "../components/movie/Cast.js";
import Images from "../components/movie/Images.js";
import Countries from "../components/movie/Countries.js";
import Summary from "../components/movie/Summary.js";
import MainInfo from "../components/movie/MainInfo.js";

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