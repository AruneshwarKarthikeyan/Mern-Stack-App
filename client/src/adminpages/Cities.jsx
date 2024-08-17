import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { hideLocationWindow, showLocationWindow } from "../redux/admin/locationSlice";

function Cities() {
    const { isLocationPopupVisible } = useSelector((state) => state.location);
    const dispatch = useDispatch();
    const [cities, setCities] = useState([]);
    const [updatedCity, setUpdatedCity] = useState({
        city_name: "",
        city_description: "",
    });
    const [newCity, setNewCity] = useState({
        city_name: "",
        city_description: "",
    });
    const [updateCount, setUpdateCount] = useState(0);

    const getCities = useCallback(async () => {
        try {
            const allCities = await axios.get('/api/admin/get-cities');
            if (allCities) {
                setCities(allCities.data);
            }
        } catch (error) {
            console.log(error);
        }
    },
        [])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/admin/delete-city/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setCities(prevCities => prevCities.filter(city => city._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id) => {
        try {
            if (updatedCity.city_name === "" && updatedCity.city_description === "") {
                toast.error("No Changes Made!");
                return;
            }

            const updateData = {};
            if (updatedCity.city_name !== "") {
                updateData.city_name = updatedCity.city_name;
            } else {
                updateData.city_name = cities.city_name;
            }
            if (updatedCity.city_description !== "") {
                updateData.city_description = updatedCity.city_description;
            } else {
                updateData.city_description = cities.city_description;
            }

            const { data } = await axios.put("api/admin/update-city/" + id, updateData);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setUpdatedCity({
                    city_name: "",
                    city_description: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("api/admin/create-city", newCity);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setNewCity({
                    city_name: "",
                    city_description: "",
                });
                setUpdateCount(updateCount + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            getCities();
        },
        [getCities, updateCount]
    );

    const handleInputChange = (e, field) => {
        setUpdatedCity((prevCityUpdates => ({ ...prevCityUpdates, [field]: e.target.innerText })));
    }

    const handlePopupInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setNewCity((prevCity) => ({ ...prevCity, [name]: value }));
        },
        []
    );

    return (
        <>
            <div id="locations">
                <h1>cities</h1>
                <div id="addLocation" style={{ display: isLocationPopupVisible ? "block" : "none" }}>
                    <h2>Add City</h2>
                    <form onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faXmark} id="close-btn" onClick={() => { dispatch(hideLocationWindow()) }} />
                        <div>
                            <label>city name</label>
                            <input type="text" name="city_name" value={newCity.city_name} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>city description</label>
                            <input type="text" name="city_description" value={newCity.city_description} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>optional</label>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="submit" value="Add City" />
                        </div>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>city-name</th>
                            <th>city-description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cities.map(
                                (city, index) => (
                                    <tr key={index}>
                                        <td contentEditable={true} onBlur={(e) => handleInputChange(e, "city_name")} suppressContentEditableWarning={true}>{city.city_name}</td>
                                        <td contentEditable={true} onBlur={(e) => handleInputChange(e, "city_description")} suppressContentEditableWarning={true}>{city.city_description}</td>
                                        <td><button id='update' onClick={() => { handleUpdate(city._id) }}>update</button></td>
                                        <td><button id="delete" onClick={() => { handleDelete(city._id) }}>delete</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div id="btns">
                    <button onClick={() => { dispatch(showLocationWindow()) }}>Add city</button>
                </div>
            </div>

            {/* mobile screen */}

            <div id="mobile-screen-locations">
                <div id="addLocation" style={{ display: isLocationPopupVisible ? "block" : "none" }}>
                    <h2>Add City</h2>
                    <form onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faXmark} id="close-btn" onClick={() => { dispatch(hideLocationWindow()) }} />
                        <div>
                            <label>city name</label>
                            <input type="text" name="city_name" value={newCity.city_name} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>city description</label>
                            <input type="text" name="city_description" value={newCity.city_description} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>optional</label>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="submit" value="Add City" />
                        </div>
                    </form>
                </div>
                <div id="grid">
                    {
                        cities.map(
                            (city, index) => (
                                <div key={index} id="location-card">
                                    <p onBlur={(e) => handleInputChange(e, "city_name")} contentEditable={true} suppressContentEditableWarning={true}>{city.city_name}</p>
                                    <p onBlur={(e) => handleInputChange(e, "city_description")} contentEditable={true} suppressContentEditableWarning={true}>{city.city_description}</p>
                                    <button id='update' onClick={() => { handleUpdate(city._id) }}>update</button>
                                    <button id="delete" onClick={() => { handleDelete(city._id) }}>delete</button>
                                </div>
                            )
                        )
                    }
                </div>
                <div id="btns">
                    <button onClick={() => { dispatch(showLocationWindow()) }}>Add city</button>
                </div>
            </div>
        </>
    )
}

export default Cities


