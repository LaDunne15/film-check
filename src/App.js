import Main from "./components/Main";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Search from "./components/Search";
import Movie from "./components/Movie";
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
        </Routes>
      </Router>
    </div>
  )
}

export default App;
