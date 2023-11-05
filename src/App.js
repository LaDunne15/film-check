import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./components/search/Search";
import Actor from "./components/actor/Actor";
import HeaderElement from "./components/header/headerElement";
import FooterElement from "./components/footer/footerElement";

import "./static/styles/constants.css";
import "./static/styles/app.css";

import ScrollToTop from "./utils/scrollToTop";
import TitlePage from "./pages/TitlePage";

function App() {


  	return (
    	<>
      		<Router>
				<ScrollToTop/>
				<div className="app">
					<HeaderElement/>
        			<Routes>   
	          			<Route exact path="/" element={<Main/>} />
    	      			<Route path="/search/:search/:page?" element={<Search/>} />
        	  			<Route path="/movie/:id" element={<TitlePage/>}/>
	          			<Route path="/actor/:id" element={<Actor/>}/>
	        		</Routes>
					<FooterElement/>
				</div>
      		</Router>
    	</>
	)
}

export default App;
