import { useEffect, useState } from "react";
import { titlesService } from "../../../services/titlesService";
import image from "../../../app/constants/image";
function Images({id}) {

    const [ images, setImages ] = useState([image]);

    const [ isLoading, setIsLoading] = useState(true); // To track loading state
    const [ isError, setIsError] = useState(false); // To track any errors
    const [ errorData, setErrorData ] = useState([]);

    useEffect(()=>{
        setIsError(true);
    },[errorData]);

    useEffect(()=>{
        setIsLoading(true);
        titlesService.getTitleImages(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setImages(
                        data.results.titleMainImages.edges.map(i=>({
                            url: i.node.url,
                            plainText: i.node.caption.plainText
                        }))
                    );
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
        <div className="images">
            {
                images.map((i,index)=><img style={{width:"100px"}} loading="lazy" key={index} src={i.url} alt={i.plainText}/>)
            }
        </div>
    )
}

export default Images;