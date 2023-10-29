import RevenueBudget from "./elements/RevenueBudget";
import MoreLikeThis from "./elements/MoreLikeThis.js";
import Awards from "./elements/Awards.js";
import Cast from "./elements/Cast.js";
import Images from "./elements/Images.js";
import Countries from "./elements/Countries.js";
import Summary from "./elements/Summary.js";
import MainInfo from "./elements/MainInfo.js";
import RecentViews from "../recentViews/RecentViews.js";

import "./title.scss";

function Title ({id}) {
    return (
        <div className="title">
            <MainInfo id={id}/>
            <Countries id={id}/>
            <Images id={id}/>
            <Cast id={id}/>
            <Awards id={id}/>
            <RevenueBudget id={id}/>
            <Summary id={id}/>
            <MoreLikeThis id={id}/>
            <RecentViews/>
        </div>
    )
}

export default Title;