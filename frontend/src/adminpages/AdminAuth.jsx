import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// redux reducer imports
import { adminLoginStart, adminLoginSuccess, adminLoginFailed } from '../redux/admin/adminSlice'

// file imports
import Header from '../components/Header'
import Themes from '../components/Themes'
import Footer from '../components/Footer'

function AdminAuth() {
    const [admin, setAdmin] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }))
        },
        []
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(adminLoginStart());
            const { data } = await axios.post('/api/admin/admin-auth', admin);
            if (data.error) {
                dispatch(adminLoginFailed())
                toast.error(data.error);
            } else {
                dispatch(adminLoginSuccess(data));
                setAdmin({
                    email: "",
                    password: "",
                })
                navigate('/admin-panel');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <Themes />
            <div id="admin-auth-page">
                <div id="admin-wrapper">
                    <section id='admin-sec'>
                        <h1 id='admin-title'>Admin</h1>
                        <form id="admin-form" onSubmit={(e) => { handleSubmit(e) }}>

                            <div id="admin-input-field">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={admin.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor='email'>Email</label>
                            </div>

                            <div id="admin-input-field">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={admin.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor='password'>Password</label>
                            </div>

                            <div id='admin-submit'>
                                <input
                                    type='submit'
                                    id='btn'
                                    value="LET ME IN"
                                />
                            </div>

                        </form>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AdminAuth
