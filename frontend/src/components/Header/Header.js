import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const [banksOptionStyle, setBanksOptionStyle] = useState({});
  const [usersOptionStyle, setUsersOptionStyle] = useState({});
  useEffect(() => {
    if (location.pathname === "/") {
      setBanksOptionStyle({ fontSize: "45px" });
      setUsersOptionStyle({ fontSize: "25px" });
    } else if (location.pathname === "/users") {
      setBanksOptionStyle({ fontSize: "25px" });
      setUsersOptionStyle({ fontSize: "45px" });
    }
  }, [location.pathname]);
  return (
    <div className="header">
      <nav>
        <Link style={banksOptionStyle} to="/" className="nav-item">
          Banks
        </Link>
        <div className="separator" />
        <Link style={usersOptionStyle} to="/users" className="nav-item">
          Users
        </Link>
      </nav>
    </div>
  );
}

export default Header;
