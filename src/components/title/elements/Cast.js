import { useEffect, useState } from "react";
//import { encode } from 'base-64';

import cast from "../../../app/constants/cast";
import { titlesService } from "../../../services/titlesService";
import { Link } from "react-router-dom";

import BetterImage from "./BetterImage";

import ActorBlack from "../../../static/icons/actorBlack.png";
import ActorYellow from "../../../static/icons/actorYellow.png";

function Cast({id}) {

    const [ extendedCast, setExtendedCast] = useState([cast]);
    const [ principalCast, setPrincipalCast ] = useState([cast]);

    const [ isLoading1, setIsLoading1] = useState(true); // To track loading state
    const [ isLoading2, setIsLoading2] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        
        setIsLoading1(true);
        setIsLoading2(true);
        titlesService.getTitlePrincipalCast(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setPrincipalCast(
                        data.results.principalCast[0].credits.map(i=>({
                            id:i.name.id,
                            name:i.name.nameText.text,
                            imageUrl:i.name.primaryImage?.url,
                            characters: i.characters.map(j=>j.name)
                        }))
                    );
                    setIsLoading1(false);
                } else {
                    setErrorData(data);
                }
            })
        ).catch(err=>setErrorData(err));

        titlesService.getTitleExtendedCast(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setExtendedCast(
                        data.results.cast.edges.map(i=>({
                            id:i.node.name.id,
                            name:i.node.name.nameText.text,
                            imageUrl:i.node.name.primaryImage?.url,
                            characters: i.node.characters.map(j=>j.name)
                        }))
                    );
                    setIsLoading2(false);
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

    return (
        <div className="castBlock">
            {
                !isLoading1 && 
                <div className="principalCast">
                    <span>Main cast</span>
                    <div className="actors">
                    {
                        principalCast && principalCast.map(i=>
                            <div className="actor" key={i.id}>
                                <BetterImage url={i.imageUrl} altImage={ActorYellow} />
                                <Link className="actorName" to={"/actor/"+i.id}> {i.name} </Link>
                                <div className="characters">
                                    {
                                        i.characters.map ((j,index)=>
                                            <span className="character" key={index}>
                                                {j}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    </div>
                </div>
            }
            {
                !isLoading2 && 
                <div className="stribedBorder">
                    <div className="extendedCast">
                        <span>Addtional cast</span>
                        <div className="actors">
                        {
                            extendedCast && extendedCast.map(i=>
                                <div className="actor" key={i.id}>
                                    <BetterImage url={i.imageUrl} altImage={ActorBlack} />
                                    <Link className="actorName" to={"/actor/"+i.id}> {i.name} </Link>
                                    <div className="characters">
                                        {
                                            i.characters.map ((j,index)=>
                                                <span className="character" key={index}>
                                                    {j}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cast;