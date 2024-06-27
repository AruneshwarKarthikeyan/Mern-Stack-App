import { useCallback, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addCity } from "../redux/admin/createCitySlice";

function CreatyCity() {
    const [city, setCity] = useState({
        city_name: "",
        city_description: "",
        custom: ""
    })
    const dispatch = useDispatch();

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setCity((prevCity) => ({ ...prevCity, [name]: value }));
        },
        []
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/admin/create-city', city);
            if (data.error) {
                toast.error(data.error);
            }
            else {
                dispatch(addCity(data));
                setCity({ city_name: "", city_description: "" })
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="city-create-page">
            <div id="city-create-wrapper">
                <h1>Add New City</h1>
                <form id="city-create-form" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="city-name">City Name</label>
                        <input
                            type="text"
                            id="city-name"
                            name="city_name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="city-description">City Description</label>
                        <input
                            type="text"
                            id="city-description"
                            name="city_description"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label>(Optional)</label>
                        <input type="text" />
                    </div>

                    <div>
                        <Link id="cancel" to="/admin-panel"><input type="button" value="cancel" /></Link>
                        <input type="submit" value="create" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatyCity
