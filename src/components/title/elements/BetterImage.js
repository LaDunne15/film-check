import { useEffect, useState } from "react";

function BetterImage({url,altImage}) {

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
            _setUrl(isValidUrl?url:altImage);
        })
    },[url,altImage]);

    return (
        <img src={_url} alt="actor"/>
    )
}

export default BetterImage;