import RecentViews from "../components/RecentViews";
import TopBoxOfficeLastWeekend from "../components/topBoxOfficeLastWeekend/TopBoxOfficeLastWeekend";
import MainSearchElement from "../components/mainSearchElement/MainSearchElement";

function Main() {
    return (
        <>
            <MainSearchElement/>
            <TopBoxOfficeLastWeekend/>
            <RecentViews/>
        </>
    );
}

export default Main;