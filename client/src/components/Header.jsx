import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// profile icon import 
import profileicon from "../assets/profile-icon.jpg";

function Header() {
    return (
        <div id="header">
            <h1>Mern-Stack-App</h1>
            <input type="checkbox" id="check" />
            <label htmlFor="check">
                <FontAwesomeIcon id="bars" icon={faBars} />
            </label>
            <nav id="navlinks">
                <NavLink id="navlink" to="/dashboard">Home</NavLink>
                <NavLink id="navlink" to="/">Sign Up</NavLink>
                <NavLink id="navlink" to="/login">Log In</NavLink>
                <NavLink id="navlink" to="/profile">
                    <img src={profileicon} id="profile-image" alt="P" />
                </NavLink>
            </nav>
        </div>
    );
}

export default Header
