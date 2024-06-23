import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

// redux reducer imports
import { adminPanelState, adminLogoutSuccess } from "../redux/admin/adminSlice"

// file imports
import Header from "../components/Header"
import Themes from "../components/Themes"
import Footer from "../components/Footer"

function AdminPanel() {
    const { currentAdmin, token, users } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(
        () => {
            getUsers();
        },
        []
    );

    const getUsers = async () => {
        const { data } = await axios.get('/api/admin/get-users');
        if (data) {
            dispatch(adminPanelState(data));
        }
    }

    const handleLogout = async () => {
        const { data } = await axios.get('/api/admin/admin-logout');
        if (data) {
            dispatch(adminLogoutSuccess());
            navigate('/admin-auth');
            toast.success(data.message);
        }
    }

    return (
        <>
            <Header />
            <Themes />
            <div id='admin-panel'>
                <Header />
                <div id='admin-panel-wrapper'>
                    <section id='admin-panel-sec1'>
                        <h1 id='admin-panel-title'>Admin Panel</h1>
                        <div>
                            <h2>Admin: <span>{currentAdmin ? currentAdmin.email : ""}</span></h2>
                            <h2>Total Users: <span>{users ? users.length : ""}</span></h2>
                            <input
                                type='button'
                                value='Logout'
                                onClick={handleLogout}
                            />
                        </div>
                    </section>
                    <section id='admin-panel-sec2'>
                        <Link to='/admin-create-user' id='admin-panel-hyperlink'>&gt;&gt;Create User</Link>
                        <Link to='/admin-get-users' id='admin-panel-hyperlink'>&gt;&gt;Get Users</Link>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AdminPanel

