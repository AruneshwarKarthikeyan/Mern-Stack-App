import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

// redux reducer import
import { logoutSuccess } from '../redux/user/userSlice'

// file imports
import Header from '../components/Header'
import Themes from '../components/Themes'
import Footer from '../components/Footer'

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            dispatch(logoutSuccess());
            navigate('/login');
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div id='dashboard-page'>
                <div>
                    <Header />
                    <Themes />
                    <div id='demo-dash-page'>
                        <h1>WELCOME</h1>
                        <h2>USER : <span>{currentUser ? currentUser.name : ""}</span></h2>
                        <h2>ID : <span>{currentUser ? currentUser.email : ""}</span></h2>
                        <div id='dashboard-btn'>
                            <button onClick={handleLogout} id='logout'>logout</button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Home;

