import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

// redux reducer imports
import { showThemeWindow } from "../redux/theme/themeSlice"

function Footer() {
    const dispatch = useDispatch();
    return (
        <div id="footer">
            <NavLink id="navlink" to="/admin-auth">Admin</NavLink>
            <input type="checkbox" id="theme-check" onChange={() => dispatch(showThemeWindow())} />
            <label id="navlink" htmlFor="theme-check">Themes</label>
        </div>
    )
}

export default Footer



