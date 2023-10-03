import { Link } from "react-router-dom"
import "./header.css";

function HeaderElement() {
    return (
        <nav className="header">
			<span className="logo">
				FilmCHECK
			</span>
			<ul>
				<li>
					<Link className="link" to="/">Home</Link>
				</li>
			</ul>
		</nav>
    )
}

export default HeaderElement;