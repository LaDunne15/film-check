import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Movie() {

    const {id} =useParams();
    const [ movie, setMovie] = useState([]);
    const [ revenueBudget, setRevenueBudget ] = useState([]);
    const [ extendedCast, setExtendedCast] = useState([]);
    const [ awards, setAwards ] = useState([]);
    const [ trailer, setTrailer ] = useState([]);
    const [ moreLikeThis, setMoreLikeThis ] = useState([]);
    const [ summaries, setSummaries ] = useState([]);
    const [ images, setImages ] = useState([]);
    const [ synopses, setSynopses ] = useState([]);
    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ error, setError] = useState(false); // To track any errors

    useEffect(()=>{
        const apiUrl = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=custom_info";
        fetch(apiUrl, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setMovie(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl4 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=crevenue_budget";
        fetch(apiUrl4, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setRevenueBudget(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl5 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=extendedCast";
        fetch(apiUrl5, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setExtendedCast(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl6 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=awards";
        fetch(apiUrl6, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setAwards(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl7 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=trailer";
        fetch(apiUrl7, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com"
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setTrailer(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl8 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=moreLikeThisTitles";
        fetch(apiUrl8, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setMoreLikeThis(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl9 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=summaries";
        fetch(apiUrl9, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setSummaries(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl10 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=titleMainImages";
        fetch(apiUrl10, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setImages(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        const apiUrl12 = 'https://moviesdatabase.p.rapidapi.com/titles/'+id+"?info=synopses";
        fetch(apiUrl12, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12",
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                setError(true);
            }
            return response.json(); 
        })
        .then((data) => {
            setSynopses(data);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    },[]);

    return (
        <pre>
            Трейлер:
            {
                JSON.stringify(trailer,null,2)
            }
            Фільм:
            {
                JSON.stringify(movie,null,2)
            }
            Бютжет:
            {
                JSON.stringify(revenueBudget,null,2)
            }
            Озвучки:
            {
                JSON.stringify(extendedCast,null,2)
            }
            Нагороди:
            {
                JSON.stringify(awards,null,2)
            }
            Схожі:
            {
                JSON.stringify(moreLikeThis,null,2)
            }
            Підсумок:
            {
                JSON.stringify(summaries,null,2)
            }
            Зображення:
            {
                JSON.stringify(images,null,2)
            }
            Синопсис:
            {
                JSON.stringify(synopses,null,2)
            }
        </pre>
    )
}

export default Movie;