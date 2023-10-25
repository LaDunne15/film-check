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

    function imageExists(image_url){

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status !== 404?image_url:"";
    
    }
    useEffect(()=>{
        setIsLoading(true);
        titlesService.getTitleImages(id).then(
            res=>res.json().then(data=>{
                if(res.ok) {
                    setImages(
                        data.results.titleMainImages.edges.map(i=>({
                            url: imageExists(i.node.url),
                            plainText: i.node.caption.plainText
                        })).filter((i)=>i.url!=="")
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

    const event1 = (a) => {
        setModalActive(true);
        setCurrentImage(a);
    }

    const nextImage = () => {
        if(currentImage<images.length-1) {
            setCurrentImage(currentImage+1);
        }
    }

    const prevImage = () => {
        if(currentImage>0) {
            setCurrentImage(currentImage-1);
        }
    }

    const [modalActive, setModalActive] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="imagesBlock">
            {
                modalActive &&
                <div className="modal">
                    <div className="button"><button onClick={()=>setModalActive(false)}>CLOSE &#10005;</button></div>
                    <div className="imageData">
                        <img src={images[currentImage].url} alt={images[currentImage].plainText}/>
                    </div>
                    <div className="buttons">
                        <div>{ currentImage>0?<button className="left" onClick={prevImage}><span>&#60;</span></button>:<div></div>}</div>
                        <span>{images[currentImage].plainText}</span>
                        <div>{ currentImage<images.length-1?<button className="right" onClick={nextImage}><span>&#62;</span></button>:<div></div>}</div>
                    </div>
                </div>
            }
            <div className="images">
            {
                images.slice(0,3).map((i,index)=>
                    <div key={index}>
                        <img onClick={()=>event1(index)} loading="lazy" src={i.url} alt={i.plainText}/>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default Images;