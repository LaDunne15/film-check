import { useEffect, useState } from "react";

import Actor from "../../../static/icons/actorBlack.png";
import ActorYellow from "../../../static/icons/actorYellow.png";

function ActorImage({url,isYellow}) {

    const [_url,_setUrl] = useState("");

    async function checkImage(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
    }

    useEffect(()=>{
        checkImage(url).then((isValidUrl)=>{
            _setUrl(isValidUrl?url:(isYellow?ActorYellow:Actor));
        })
    },[url])

    return (
        <img src={_url} alt="actor"/>
    )
}

export default ActorImage;