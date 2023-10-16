import { Link } from "react-router-dom"
import "./header.scss";

function HeaderElement() {
    return (
        <nav className="header">
			<Link className="logo" to="/">FILM<b className="logo-2">CHECK</b></Link>
		</nav>
    )
}

export default HeaderElement;