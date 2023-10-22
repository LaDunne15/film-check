import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addTitle } from '../features/recentView/recentViewSlice.js'
import { useDispatch } from "react-redux";

import Title from "../components/title/Title.js";

function TitlePage() {

    const {id} =useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(addTitle(id));
    },[id, dispatch]);

    return (
        <Title id={id}/>
    )
}
export default TitlePage;