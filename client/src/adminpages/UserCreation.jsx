import axios from "axios";
import { useCallback, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserCreation() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
    })
    const navigate = useNavigate();

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        },
        []
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/signup', user);
            if (data.error) {
                toast.error(data.error);
            } else {
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    confirmpassword: "",
                })
                navigate('/admin-panel');
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id='admin-user-creation-page'>
            <div id='admin-user-creation-wrapper'>
                <h1 id="admin-user-creation-title">create user as a admin</h1>
                <form id="admin-user-creation-form" onSubmit={(e) => handleSubmit(e)}>

                    <div id="admin-user-creation-input-field">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div id="admin-user-creation-input-field">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div id="admin-user-creation-input-field">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div id="admin-user-creation-input-field">
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            value={user.confirmpassword}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="confirmpassword">Confirm Password</label>
                    </div>

                    <div id='admin-user-creation-submit'>
                        <input
                            type='submit'
                            id="btn"
                            value='Create User'
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UserCreation
