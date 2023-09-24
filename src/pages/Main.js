import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentViews from "../components/RecentViews";
import TopBoxOfficeLastWeekend from "../components/TopBoxOfficeLastWeekend";

function Main() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const find = () => {
        navigate("/search/"+search);
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>
                Пошук
            </h1>
            <form>
                <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <input type="button" onClick={find} value="Пошук"/>
            </form>
            <TopBoxOfficeLastWeekend/>
            <RecentViews/>
        </div>
    );
}

export default Main;