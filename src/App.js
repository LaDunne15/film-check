import Main from "./components/Main";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Search from "./components/Search";
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
          <Route path="/search" element={<Search/>} />
          <Route path="/search/:search/:page?" element={<Search/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
