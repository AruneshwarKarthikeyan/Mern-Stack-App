import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

function AdminHeader() {
    const { isLoggedIn } = useSelector((state) => state.admin);

    return (
        <div id="admin-header">
            <h1>Admin-Portal</h1>
            <input type="checkbox" id="check" />
            <label htmlFor="check">
                <FontAwesomeIcon id="bars" icon={faBars} />
            </label>
            <nav id="admin-navlinks">
                <NavLink id="navlink" to="/admin-create-city" style={{ display: isLoggedIn ? 'block' : 'none' }}>Create City</NavLink>
            </nav>
        </div>
    )
}

export default AdminHeader
