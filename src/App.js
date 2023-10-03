import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import HeaderElement from "./components/header/headerElement";
import FooterElement from "./components/footer/footerElement";

import "./static/styles/constants.css";

function App() {

  	return (
    	<>
      		<Router>
				<HeaderElement/>
        		<Routes>   
	          		<Route exact path="/" element={<Main/>} />
    	      		<Route path="/search/:search/:page?" element={<Search/>} />
        	  		<Route path="/movie/:id" element={<Movie/>}/>
          			<Route path="/actor/:id/:imageUrl" element={<Actor/>}/>
	        	</Routes>
				<FooterElement/>
      		</Router>
    	</>
	)
}

export default App;
