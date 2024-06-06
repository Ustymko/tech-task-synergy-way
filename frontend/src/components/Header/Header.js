import { Link } from "react-router-dom";
import "./Header.css"

function Header(){
  return(
    <div className="header">
      <nav>
        <Link to="/" className="nav-item">Banks</Link>
        <div className="separator"/>
        <Link to="/users" className="nav-item">Users</Link>
      </nav>
    </div>
  )
}

export default Header;