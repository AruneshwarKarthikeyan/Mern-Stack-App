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
    }, [image]);

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
                    {[
                        { label: 'Door No', name: 'door_no', type: 'number' },
                        { label: 'Street', name: 'street', type: 'text' },
                        { label: 'Town / City', name: 'town_or_city', type: 'text' },
                        { label: 'District', name: 'district', type: 'text' },
                        { label: 'State', name: 'state', type: 'text' },
                        { label: 'Country', name: 'country', type: 'text' },
                        { label: 'Pincode', name: 'pincode', type: 'number' },
                    ].map((field) => (
                        <div key={field.name}>
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