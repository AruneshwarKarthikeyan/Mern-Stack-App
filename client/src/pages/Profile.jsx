import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";

// redux reducer import
import { profileUpdated } from '../redux/user/userSlice';

// firebase imports
import app from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

// profile-icon imports
import profileicon from '../assets/profile-icon.jpg';

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileRef = useRef(null);

    const [user, setUser] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        date: currentUser?.date || '',
        gender: currentUser?.gender || '',
        door_no: currentUser?.address?.door_no || '',
        street: currentUser?.address?.street || '',
        town_or_city: currentUser?.address?.town_or_city || '',
        district: currentUser?.address?.district || '',
        state: currentUser?.address?.state || '',
        country: currentUser?.address?.country || '',
        pincode: currentUser?.address?.pincode || '',
        profile: currentUser?.profile || profileicon,
    });

    const [image, setImage] = useState(null);
    const [imagePercent, setImagePercent] = useState(null);

    useEffect(() => {
        if (image) {
            handleUpload(image);
        }
        getCities();
        getStates();
        getCountries();

    }, [image]);

    const getCities = async () => {
        try {
            const allCities = await axios.get('/api/admin/get-cities');
            if (allCities) {
                setCities(allCities.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getStates = async () => {
        try {
            const allStates = await axios.get('/api/admin/get-states');
            if (allStates) {
                setStates(allStates.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCountries = async () => {
        try {
            const allCountries = await axios.get('/api/admin/get-countries');
            if (allCountries) {
                setCountries(allCountries.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpload = useCallback((image) => {
        const storage = getStorage(app);
        const filename = new Date().toISOString() + " - " + image.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUser((prevUser) => ({ ...prevUser, profile: downloadURL }));
                });
            }
        );
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/user/update-profile/${currentUser._id}`, user);
            dispatch(profileUpdated(data.user));
            navigate('/dashboard');
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/user/profile-delete/${currentUser._id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="profile-page">
            <form id="profile-form" onSubmit={handleSubmit}>
                <div id="profile-field">
                    <input type="file" accept="image/*" ref={fileRef} hidden onChange={(e) => setImage(e.target.files[0])} />
                    <img src={user.profile} alt="P" onClick={() => fileRef.current.click()} />
                    {imagePercent !== null && imagePercent !== 100 ? <p id="percentage">{imagePercent}%</p> : ""}
                </div>

                {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: 'Phone', name: 'phone', type: 'number' },
                    { label: 'D.O.B', name: 'date', type: 'date' },
                ].map((field) => (
                    <div id="profile-input-field" key={field.name}>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={user[field.name]}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor={field.name}>{field.label}</label>
                    </div>
                ))}

                <div id="radio-field">
                    <div>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            checked={user.gender === 'male'}
                            value="male"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            checked={user.gender === 'female'}
                            value="female"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>

                <div id="address-field">
                    <div>
                        <input
                            type="number"
                            id="door_no"
                            name="door_no"
                            value={user.door_no}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="door_no">Door No</label>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={user.street}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="street">Street</label>
                    </div>

                    <div>
                        <select id="cities" name="town_or_city" value={user.town_or_city} onChange={handleInputChange}>
                            <option value="">Select a city</option>
                            {
                                cities.map((city, index) => (
                                    <option key={index} value={city.city_name}>{city.city_name}</option>
                                ))
                            }
                        </select>
                        <label>City</label>
                    </div>

                    {/* <div>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={user.district}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="district">District</label>
                    </div> */}

                    <div>
                        <select id="states" name="state" value={user.state} onChange={handleInputChange}>
                            <option value="">Select a state</option>
                            {
                                states.map((state, index) => (
                                    <option key={index} value={state.state_name}>{state.state_name}</option>
                                ))
                            }
                        </select>
                        <label>State</label>
                    </div>

                    <div>
                        <select id="countries" name="country" value={user.country} onChange={handleInputChange}>
                            <option value="">Select a country</option>
                            {
                                countries.map((country, index) => (
                                    <option key={index} value={country.country_name}>{country.country_name}</option>
                                ))
                            }
                        </select>
                        <label>Country</label>
                    </div>

                    <div>
                        <input
                            type="number"
                            id="pincode"
                            name="pincode"
                            value={user.pincode}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="pincode">Pincode</label>
                    </div>
                </div>
                <div id="profile-page-btns">
                    <input
                        type="button"
                        value="Delete Account"
                        id="delete-btn"
                        onClick={handleDelete}
                    />
                    <input
                        type="submit"
                        value="Update"
                        id="update-btn"
                    />
                </div>
            </form>
        </div>
    );
}

export default Profile;
