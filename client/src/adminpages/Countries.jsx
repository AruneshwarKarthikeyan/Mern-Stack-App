import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { hideLocationWindow, showLocationWindow } from "../redux/admin/locationSlice";

function Countries() {
    const { isLocationPopupVisible } = useSelector((state) => state.location);
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const [updatedCountry, setUpdatedCountry] = useState({
        country_name: "",
        country_description: "",
    });
    const [newCountry, setNewCountry] = useState({
        country_name: "",
        country_description: "",
    });
    const [updateCount, setUpdateCount] = useState(0);

    const getCountries = useCallback(async () => {
        try {
            const allCountries = await axios.get('/api/admin/get-countries');
            if (allCountries) {
                setCountries(allCountries.data);
            }
        } catch (error) {
            console.log(error);
        }
    },
        [])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/admin/delete-country/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setCountries(prevCountries => prevCountries.filter(country => country._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id) => {
        try {
            if (updatedCountry.country_name === "" && updatedCountry.country_description === "") {
                toast.error("No Changes Made!");
                return;
            }

            const updateData = {};
            if (updatedCountry.country_name !== "") {
                updateData.country_name = updatedCountry.country_name;
            } else {
                updateData.country_name = countries.country_name;
            }
            if (updatedCountry.country_description !== "") {
                updateData.country_description = updatedCountry.country_description;
            } else {
                updateData.country_description = countries.country_description;
            }

            const { data } = await axios.put("api/admin/update-country/" + id, updateData);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setUpdatedCountry({
                    country_name: "",
                    country_description: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("api/admin/create-country", newCountry);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setNewCountry({
                    country_name: "",
                    country_description: "",
                });
                setUpdateCount(updateCount + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            getCountries();
        },
        [getCountries, updateCount]
    );

    const handleInputChange = (e, field) => {
        setUpdatedCountry((prevCountryUpdates => ({ ...prevCountryUpdates, [field]: e.target.innerText })));
    }

    const handlePopupInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setNewCountry((prevCountry) => ({ ...prevCountry, [name]: value }));
        },
        []
    );

    return (
        <>
            <div id="locations">
                <h1 >countries</h1>
                <div id="addLocation" style={{ display: isLocationPopupVisible ? "block" : "none" }}>
                    <h2>Add Country</h2>
                    <form onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faXmark} id="close-btn" onClick={() => { dispatch(hideLocationWindow()) }} />
                        <div>
                            <label>country name</label>
                            <input type="text" name="country_name" value={newCountry.country_name} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>country description</label>
                            <input type="text" name="country_description" value={newCountry.country_description} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>optional</label>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="submit" value="Add Country" />
                        </div>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>country-name</th>
                            <th>country-description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countries.map(
                                (country, index) => (
                                    <tr key={index}>
                                        <td contentEditable={true} onBlur={(e) => handleInputChange(e, "country_name")} suppressContentEditableWarning={true}>{country.country_name}</td>
                                        <td contentEditable={true} onBlur={(e) => handleInputChange(e, "country_description")} suppressContentEditableWarning={true}>{country.country_description}</td>
                                        <td><button id='update' onClick={() => { handleUpdate(country._id) }}>update</button></td>
                                        <td><button id="delete" onClick={() => { handleDelete(country._id) }}>delete</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div id="btns">
                    <button onClick={() => { dispatch(showLocationWindow()) }}>Add country</button>
                </div>
            </div>

            {/* mobile screen */}

            <div id="mobile-screen-locations">
                <div id="addLocation" style={{ display: isLocationPopupVisible ? "block" : "none" }}>
                    <h2>Add Country</h2>
                    <form onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faXmark} id="close-btn" onClick={() => { dispatch(hideLocationWindow()) }} />
                        <div>
                            <label>country name</label>
                            <input type="text" name="country_name" value={newCountry.country_name} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>country description</label>
                            <input type="text" name="country_description" value={newCountry.country_description} onChange={handlePopupInputChange} />
                        </div>
                        <div>
                            <label>optional</label>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="submit" value="Add Country" />
                        </div>
                    </form>
                </div>
                <div id="grid">
                    {
                        countries.map(
                            (country, index) => (
                                <div key={index} id="location-card">
                                    <p onBlur={(e) => handleInputChange(e, "country_name")} contentEditable={true} suppressContentEditableWarning={true}>{country.country_name}</p>
                                    <p onBlur={(e) => handleInputChange(e, "country_description")} contentEditable={true} suppressContentEditableWarning={true}>{country.country_description}</p>
                                    <button id='update' onClick={() => { handleUpdate(country._id) }}>update</button>
                                    <button id="delete" onClick={() => { handleDelete(country._id) }}>delete</button>
                                </div>
                            )
                        )
                    }
                </div>
                <div id="btns">
                    <button onClick={() => { dispatch(showLocationWindow()) }}>Add country</button>
                </div>
            </div>
        </>
    )
}

export default Countries

