import { Link } from "react-router-dom"


function ServiceLocations() {
    return (
        <div id="service-locations">
            <Link to="/country" id="service-links" >Country</Link>
            <Link to="/state" id="service-links" >State</Link>
            <Link to="/city" id="service-links" >City</Link>
        </div>
    )
}

export default ServiceLocations
