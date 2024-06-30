import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { addCity } from "../redux/admin/createCitySlice";


function CityLists() {
    const { cities } = useSelector((state) => state.createCity);
    const dispatch = useDispatch();
    const [cityUpdates, setCityUpdates] = useState({});

    useEffect(() => {
        getCities();
    }, []
    );

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/admin/delete-city/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                dispatch(addCity(cities.filter(city => city._id !== id)));
            }
        } catch (error) {
            console.log(error);
        }
    }



    const handleUpdate = async (id) => {
        try {
            const city = cityUpdates[id];
            const { data } = await axios.put(`/api/admin/update-city/${id}`, city);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCities = async () => {
        try {
            const allCities = await axios.get('/api/admin/get-cities');
            if (allCities) {
                dispatch(addCity(allCities.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (id, field, value) => {
        setCityUpdates((prevUpdates) => ({
            ...prevUpdates,
            [id]: {
                ...prevUpdates[id],
                [field]: value,
            }
        }))
    }

    return (
        <>
            <div id="cities-list">
                <table>
                    <caption>Cities List</caption>
                    <thead>
                        <tr>
                            <th>City Name</th>
                            <th>City Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cities.map((city, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="text" value={cityUpdates[city._id]?.city_name ?? city.city_name} onChange={e => handleInputChange(city._id, "city_name", e.target.value)} style={{ color: "black" }} />
                                    </td>
                                    <td>
                                        <input type="text" value={cityUpdates[city._id]?.city_description ?? city.city_description} onChange={e => handleInputChange(city._id, "city_description", e.target.value)} style={{ color: "black" }} />
                                    </td>
                                    <td>
                                        <button id="update" onClick={() => { handleUpdate(city._id) }}>update</button>
                                    </td>
                                    <td>
                                        <button id="delete" onClick={() => { handleDelete(city._id) }}>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CityLists