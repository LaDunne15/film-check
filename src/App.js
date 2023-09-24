import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Search from "./components/Search";
import Movie from "./components/movie/Movie";
import Actor from "./components/Actor";
function App() {

  return (
    <div>
      <Router>
      <nav>
          <ul>
            <li>
              <Link to="/">Домашня сторінка</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Routes>   
          <Route exact path="/" element={<Main/>} />
          <Route path="/search/:search/:page?" element={<Search/>} />
          <Route path="/movie/:id" element={<Movie/>}/>
          <Route path="/actor/:id/:imageUrl" element={<Actor/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
