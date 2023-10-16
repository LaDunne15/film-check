import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainSearchElement.scss";
import searchIco from "../../static/icons/search.png";

function MainSearchElement() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const find = (e) => {
        e.preventDefault();
        navigate("/search/"+search);
    }


    return (
        <form className="search" onSubmit={find}>
            <span className="request-text">
                Input title name for search
            </span>
            <div className="inputLabel">
                <input className="title" type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button type="submit">
                    <img src={searchIco} alt="search"/>
                </button>
            </div>
            <span className="examples">
                for example: Titanic, Austin Powers, Dorohedoro, etc.
            </span>
        </form>
    )
}

export default MainSearchElement;