import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'

// redux reducer import
import { profileUpdated } from '../redux/user/userSlice'

// firebase imports
import app from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

// profile icon imports
import profileicon from '../assets/profile-icon.jpg'
import { addCity } from "../redux/admin/createCitySlice";

function UserUpdate() {
    const { user } = useSelector((state) => state.admin);
    const { cities } = useSelector((state) => state.createCity);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileRef = useRef(null);

    const [User, setUser] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        date: user?.date || '',
        gender: user?.gender || '',
        door_no: user?.address?.door_no || '',
        street: user?.address?.street || '',
        town_or_city: user?.address?.town_or_city || '',
        district: user?.address?.district || '',
        state: user?.address?.state || '',
        country: user?.address?.country || '',
        pincode: user?.address?.pincode || '',
        profile: user?.profile || profileicon,
    });

    const [image, setImage] = useState(null);
    const [imagePercent, setImagePercent] = useState(null);

    useEffect(
        () => {
            if (image) {
                handleUpload(image);
            }
            getCities()
        },
        [image]
    )
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
            const { data } = await axios.put(`/api/user/update-profile/${user._id}`, User);
            dispatch(profileUpdated(data.user));
            navigate('/admin-panel');
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/user/profile-delete/${user._id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                navigate('/admin-panel');
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
                    <img src={User.profile} alt="P" onClick={() => fileRef.current.click()} />
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
                            value={User[field.name]}
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
                            checked={User.gender === 'male'}
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
                            checked={User.gender === 'female'}
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
                            value={User.door_no}
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
                            value={User.street}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="street">Street</label>
                    </div>

                    <div>

                        <select id="cities" name="town_or_city" value={User.town_or_city} onChange={handleInputChange}>
                            <option value="">Select a city</option>
                            {
                                cities && cities.map((city, index) => (
                                    <option key={index} value={city.city_name}>{city.city_name}</option>
                                ))
                            }
                        </select>
                        <label>Town / City</label>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={User.district}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="district">District</label>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={User.state}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="state">State</label>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={User.country}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="country">Country</label>
                    </div>

                    <div>
                        <input
                            type="number"
                            id="pincode"
                            name="pincode"
                            value={User.pincode}
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

export default UserUpdate

